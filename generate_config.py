import json
import re

def parse_txt_to_config(txt_path, out_path):
    with open(txt_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split by packages
    packages_raw = content.split('BUILD ZEN\u2028ARCHITECTURE \u2022 STRUCTURAL ENGINEERING \u2022 TURNKEY CONSTRUCTION')
    
    if len(packages_raw) <= 1:
        packages_raw = re.split(r'BUILD ZEN[^\n]*ARCHITECTURE', content)
        
    packages_data = []

    for p_raw in packages_raw:
        p_raw = p_raw.strip()
        if not p_raw:
            continue
            
        lines = [line.strip() for line in p_raw.split('\n') if line.strip()]
        
        name_line = ""
        rate_line = ""
        summary_line = ""
        
        for i, line in enumerate(lines):
            if line.startswith('PACKAGE BZ-'):
                name_line = line.split('\u2028')[0].strip() if '\u2028' in line else line.strip()
            elif line.startswith('Rs '):
                rate_line = line
            elif line.startswith('Package Summary:'):
                summary_line = line.replace('Package Summary:', '').strip()
                break
                
        if not name_line:
            continue
            
        rate_match = re.search(r'Rs ([\d,]+)', rate_line)
        rate = 0
        if rate_match:
            rate = int(rate_match.group(1).replace(',', ''))
            
        id_str = name_line.split('\u2022')[0].strip().replace('PACKAGE ', '').replace('-', '').lower() + '_' + name_line.split('\u2022')[-1].strip().replace(' ', '_').lower()
        
        features = []
        
        sections = {}
        
        start_idx = 0
        for i, line in enumerate(lines):
            if "Detailed Scope & Specification" in line:
                start_idx = i + 1
                break
                
        i = start_idx
        while i < len(lines):
            line = lines[i]
            if line.startswith('NOTE: Built-Up Area') or line.startswith('Standard Client Terms'):
                break
            
            cat = lines[i]
            brand = lines[i+1] if i+1 < len(lines) else ""
            desc = lines[i+2] if i+2 < len(lines) else ""
            
            sections[cat] = [
                {
                    "title": brand.strip(),
                    "description": desc.strip()
                }
            ]
            
            # Dynamic features extraction based on category
            if cat == "Steel & Structural Reinforcement":
                features.append("Steel: " + brand.strip())
            elif cat == "Flooring & Surface Finishes":
                features.append("Flooring: " + brand.strip())
            elif cat == "Sanitaryware & Bath Fittings":
                features.append("Sanitary: " + brand.strip())
            elif cat == "Doors & Woodwork":
                features.append("Doors: " + brand.strip())
                
            i += 3

        clean_sections = {}
        for k, v in sections.items():
            if not k.startswith('NOTE:'):
                clean_sections[k] = v

        pkg = {
            "id": id_str,
            "name": name_line.replace('PACKAGE ', ''),
            "description": summary_line,
            "displayStartingRate": rate,
            "internalRatePerSqft": rate,
            "features": features,
            "detailedSections": clean_sections
        }
        packages_data.append(pkg)

    js_content = "export const BuildZenConfig = {\n"
    js_content += "    fees: { value: 0 },\n"
    js_content += "    gst: { value: 0 },\n"
    js_content += "    packages: " + json.dumps(packages_data, indent=4) + "\n};\n"
    
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"Successfully generated config with {len(packages_data)} packages.")

if __name__ == "__main__":
    parse_txt_to_config('Build_Zen_Final_Master_Catalog_Corrected.txt', 'src/data/config.js')
