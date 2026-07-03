'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function Boveda() {
  const { vaultDocuments, addDocument } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos'); // 'todos', 'pdf', 'img'
  
  // Simulated document view modal
  const [viewDoc, setViewDoc] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleUpload = () => {
    const docName = prompt('Ingresa el nombre del documento que deseas subir (ej. Declaracion_Renta.pdf):', 'Constancia_SUNAT_Ruc10.pdf');
    if (docName) {
      addDocument({
        name: docName,
        size: '1.4 MB',
        type: 'pdf',
      });
      triggerToast('¡Documento subido con éxito!');
    }
  };

  const filteredDocs = vaultDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'todos' || doc.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="pt-12 px-container-margin max-w-7xl mx-auto space-y-lg text-left relative min-h-[85vh] pb-24 md:pb-12">
      
      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-lg py-md rounded-2xl shadow-xl flex items-center gap-xs font-label-md toast-slide-up">
          <span className="material-symbols-outlined text-secondary">check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <section className="mb-lg">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold">
          La Bóveda
        </h2>
        <p className="font-body-md text-on-surface-variant leading-relaxed">
          Tus permisos, RUT y certificados tributarios oficiales organizados y seguros en un solo lugar.
        </p>
      </section>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-md mb-lg">
        {/* Search */}
        <div className="relative flex-grow">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            type="text"
            placeholder="Buscar documentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-lowest h-12 outline-none transition-all font-body-md text-body-md"
          />
        </div>

        {/* Filter type dropdown */}
        <div className="flex items-center gap-sm">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-md py-2.5 bg-surface-container-highest rounded-xl text-on-surface font-label-md text-sm border-none outline-none cursor-pointer h-12"
          >
            <option value="todos">Todos los archivos</option>
            <option value="pdf">Solo PDFs (.pdf)</option>
            <option value="doc">Otros formatos</option>
          </select>

          <button
            onClick={handleUpload}
            className="flex items-center justify-center gap-xs px-lg h-12 primary-gradient text-white rounded-xl font-label-md text-sm shadow-md active:scale-95 transition-transform cursor-pointer font-bold shrink-0"
          >
            <span className="material-symbols-outlined">upload_file</span>
            Subir Documento
          </button>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="bg-surface-container-lowest rounded-[24px] p-lg border border-surface-container shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-lg">
        <div className="flex items-center gap-md text-left">
          <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">cloud_done</span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Uso de Almacenamiento</h3>
            <p className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
              {(vaultDocuments.length * 0.45).toFixed(1)} MB de 50 MB utilizados
            </p>
          </div>
        </div>
        <div className="flex-grow max-w-md w-full">
          <div className="w-full bg-surface-container rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all duration-1000"
              style={{ width: `${(vaultDocuments.length * 0.45 / 50) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-lg">
        {filteredDocs.map((doc) => {
          const isPdf = doc.name.endsWith('.pdf') || doc.type === 'pdf';
          return (
            <div
              key={doc.id}
              className="bg-surface-container-lowest rounded-[24px] border border-surface-container p-md hover:shadow-lg transition-all group relative text-left flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="w-full aspect-[4/3] bg-surface-container-low rounded-xl mb-md flex items-center justify-center overflow-hidden relative">
                  <span className={`material-symbols-outlined text-5xl opacity-80 group-hover:scale-110 transition-transform ${
                    isPdf ? 'text-error' : 'text-primary'
                  }`}>
                    {isPdf ? 'picture_as_pdf' : 'description'}
                  </span>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-xs">
                    <span className="font-label-sm text-[10px] text-primary font-bold">
                      {doc.size}
                    </span>
                  </div>
                </div>

                <div className="mb-sm px-xs">
                  <h4 className="font-label-md text-label-md text-on-surface truncate font-bold" title={doc.name}>
                    {doc.name}
                  </h4>
                  <p className="font-label-sm text-[10px] text-on-surface-variant font-medium">
                    {new Date(doc.date).toLocaleDateString('es-PE')}
                  </p>
                </div>
              </div>

              <div className="flex gap-xs mt-sm border-t border-outline-variant/10 pt-sm px-xs">
                <button
                  onClick={() => setViewDoc(doc)}
                  className="flex-grow py-1.5 rounded-lg bg-surface-container-low text-primary font-label-sm text-xs font-bold hover:bg-primary-fixed transition-colors cursor-pointer"
                >
                  Ver
                </button>
                <button
                  onClick={() => triggerToast(`¡Documento ${doc.name} descargado!`)}
                  className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
                  title="Descargar archivo"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
                <button
                  onClick={() => triggerToast('Enlace para compartir copiado al portapapeles.')}
                  className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer"
                  title="Compartir"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulated Document Viewer Modal */}
      {viewDoc && (
        <div className="fixed inset-0 bg-on-surface/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0" onClick={() => setViewDoc(null)} />
          <div className="relative bg-white rounded-3xl w-full max-w-lg p-lg shadow-2xl border border-outline-variant/30 animate-toast text-left space-y-md">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
              <div className="flex items-center gap-xs text-primary">
                <span className="material-symbols-outlined text-error">picture_as_pdf</span>
                <span className="font-label-md text-label-md font-bold text-on-surface truncate max-w-xs">
                  {viewDoc.name}
                </span>
              </div>
              <button
                onClick={() => setViewDoc(null)}
                className="p-1 hover:bg-surface-container-high rounded-full cursor-pointer text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Document Mock View canvas */}
            <div className="border border-outline-variant bg-surface-container-low h-96 rounded-2xl flex flex-col justify-center items-center text-center p-xl relative overflow-hidden select-none">
              <div className="absolute top-4 left-4 text-xs font-mono opacity-25">FORMALIA DOC VERIFICATION SECURE #98421</div>
              <span className="material-symbols-outlined text-outline-variant text-[96px] animate-pulse">
                description
              </span>
              <p className="font-headline-md text-on-surface font-bold mt-md">Vista Previa del Documento Oficial</p>
              <p className="font-label-sm text-on-surface-variant text-xs mt-sm max-w-xs leading-relaxed">
                Este archivo de extensión PDF se guarda de forma encriptada localmente. Puedes descargarlo en tu dispositivo para presentarlo ante fiscalizadores.
              </p>
            </div>

            <div className="flex justify-end gap-md">
              <button
                onClick={() => setViewDoc(null)}
                className="px-lg py-2 border border-outline-variant rounded-xl font-label-md text-xs text-on-surface cursor-pointer"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  triggerToast(`¡Documento ${viewDoc.name} descargado!`);
                  setViewDoc(null);
                }}
                className="px-lg py-2 bg-primary text-on-primary rounded-xl font-label-md text-xs font-bold hover:bg-primary-container shadow-md cursor-pointer"
              >
                Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
