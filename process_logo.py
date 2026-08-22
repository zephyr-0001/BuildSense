import numpy as np
from PIL import Image

img_path = '/Users/adithyags/.gemini/antigravity/brain/cae763b2-07e3-4625-8a8f-bc36d7d540d4/.user_uploaded/media_1787404296774.png'
img = Image.open(img_path).convert('RGBA')
data = np.array(img)

# Background removal
r, g, b, a = data.T
# Mask out everything that is grayish (gray background and gray border)
# The border is a darker gray.
# We want ONLY the orange and blue parts.
# Blue is b > r+20
# Orange is r > g+20
valid_mask = ((b.astype(int) > r.astype(int) + 20) | (r.astype(int) > g.astype(int) + 20)) & (a > 0)

data[~valid_mask.T] = (0, 0, 0, 0)

# Bounding box of valid pixels
coords = np.argwhere(valid_mask.T)
y0, x0 = coords.min(axis=0)
y1, x1 = coords.max(axis=0)

data_cropped = data[y0:y1+1, x0:x1+1]

# Save light
Image.fromarray(data_cropped).save('public/logo-light.png')

# Dark mode: turn blue to white
data_dark = data_cropped.copy()
r_c, g_c, b_c, a_c = data_dark.T
blue_mask = (b_c.astype(int) > r_c.astype(int) + 20) & (a_c > 0)
data_dark[blue_mask.T] = (255, 255, 255, 255)
Image.fromarray(data_dark).save('public/logo-dark.png')

print("Processed tightly!")
