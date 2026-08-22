import { useState } from 'react';
import { projectsData } from '../data/projects';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  
  if (!projectsData || projectsData.length === 0) return null;

  return (
    <section id="page-projects" className="page-section active">
      <div className="container section">
        <div className="text-center" style={{marginBottom: '3rem'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Our Recent <span style={{color: 'var(--color-accent)'}}>Projects</span></h2>
          <p style={{color: 'var(--color-text-muted)'}}>Explore our ongoing and completed construction sites.</p>
        </div>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
          {projectsData.map(project => (
            <div key={project.id} className="project-card" style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }} onClick={() => setActiveProject(project)}>
              <div style={{
                height: '200px', 
                background: `url(${project.coverImage}) center/cover no-repeat, var(--color-bg)`,
                borderBottom: '1px solid var(--color-border)'
              }} />
              <div style={{padding: '1.5rem'}}>
                <h3 style={{marginBottom: '0.5rem', color: 'var(--color-text-main)'}}>{project.title}</h3>
                <p style={{fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1rem'}}>{project.location} • {project.status}</p>
                <p style={{fontSize: '0.95rem'}}>{project.description}</p>
                <div style={{marginTop: '1rem', color: 'var(--color-accent)', fontWeight: 'bold', fontSize: '0.9rem'}}>
                  View Gallery ({project.gallery.length} Photos) →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeProject && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <div style={{width: '100%', maxWidth: '800px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', overflow: 'hidden'}}>
            <div style={{padding: '1rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <h3 style={{margin: 0}}>{activeProject.title} Gallery</h3>
              <button onClick={() => setActiveProject(null)} style={{
                background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-text-main)'
              }}>✕</button>
            </div>
            <div style={{padding: '1.5rem', maxHeight: '70vh', overflowY: 'auto'}}>
              {activeProject.gallery.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`${activeProject.title} photo ${idx + 1}`} 
                  style={{width: '100%', borderRadius: 'var(--radius-md)', marginBottom: '1rem', background: 'var(--color-bg)', minHeight: '200px', objectFit: 'cover'}}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ))}
              {activeProject.gallery.length === 0 && <p style={{textAlign: 'center', color: 'var(--color-text-muted)'}}>No images uploaded yet.</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
