'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [isLoaded, setIsLoaded] = useState(false);

  // User State
  const [user, setUser] = useState({
    name: 'José Vasquez',
    email: 'jose.vasquez@gmail.com',
    ruc: '10472819301',
    dni: '47281930',
    address: 'Av. Gran Chimú 456, San Juan de Lurigancho, Lima',
    signature: null, // Base64 signature image
    hasRuc: true,
    registrationDone: true,
    loggedIn: true,
  });

  // Month Selector
  const [currentMonth, setCurrentMonth] = useState('Junio 2026');

  // Sales State
  const [sales, setSales] = useState([
    { id: 1, date: '2026-06-15', amount: 1500.00, description: 'Venta de mercadería abarrotes', type: 'normal' },
    { id: 2, date: '2026-06-20', amount: 2300.00, description: 'Venta al por mayor sacos de arroz', type: 'normal' },
    { id: 3, date: '2026-06-25', amount: 1000.00, description: 'Venta de stock conservas', type: 'normal' },
    { id: 4, date: '2026-06-30', amount: 70.50, description: 'Ventas menores del 30/06/2026', type: 'normal' },
  ]);

  // Purchases State
  const [purchases, setPurchases] = useState([
    { id: 1, date: '2026-06-10', ruc: '20551234567', factura: 'F001-0004123', amount: 1200.00 },
    { id: 2, date: '2026-06-18', ruc: '20448765432', factura: 'F003-0000854', amount: 1800.00 },
  ]);

  // Monedero State (Caja Chica <= S/ 5)
  const [monederoAcumulado, setMonederoAcumulado] = useState(35.50);
  const [monederoHistory, setMonederoHistory] = useState([
    { date: '2026-07-02', amount: 35.50, status: 'en_curso' },
    { date: '2026-07-01', amount: 45.00, status: 'finalizado' },
    { date: '2026-06-30', amount: 70.50, status: 'finalizado' },
    { date: '2026-06-29', amount: 25.00, status: 'finalizado' },
    { date: '2026-06-28', amount: 60.00, status: 'finalizado' },
    { date: '2026-06-27', amount: 15.00, status: 'finalizado' },
    { date: '2026-06-26', amount: 40.00, status: 'finalizado' },
  ]);

  // Trust Score (0 to 1000)
  const [trustScore, setTrustScore] = useState(750);

  // Roadmap Missions
  const [roadmapMissions, setRoadmapMissions] = useState([
    { id: 1, title: 'Obtener RUC 10', status: 'completed', scoreReward: 150 },
    { id: 2, title: 'Firma de Documentos (FUT)', status: 'active', scoreReward: 100 },
    { id: 3, title: 'Primera Declaración Simplificada', status: 'locked', scoreReward: 150 },
    { id: 4, title: 'Mantener Historial de Ventas (3 meses)', status: 'locked', scoreReward: 200 },
  ]);

  // Vault Documents
  const [vaultDocuments, setVaultDocuments] = useState([
    { id: 1, name: 'Ficha_RUC_10472819301.pdf', size: '1.2 MB', type: 'pdf', date: '2026-06-02', fileUrl: '#' },
    { id: 2, name: 'Licencia_Municipal_SJL.pdf', size: '2.4 MB', type: 'pdf', date: '2026-06-10', fileUrl: '#' },
    { id: 3, name: 'SUNAT_Pago_Facil_Junio.pdf', size: '540 KB', type: 'pdf', date: '2026-06-30', fileUrl: '#' },
    { id: 4, name: 'Reporte_Ventas_Q1.pdf', size: '1.8 MB', type: 'pdf', date: '2026-07-01', fileUrl: '#' },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Vencimiento SUNAT', description: 'Tu declaración mensual de Junio vence pronto. Evita multas y genera tu pago hoy.', time: 'Hace 2 horas', type: 'urgent', read: false, action: 'presentar' },
    { id: 2, title: 'Cierre de día', description: 'No has realizado el cierre de caja de hoy. Revisa tu monedero y confirma la operación.', time: 'Hace 10 min', type: 'warning', read: false, action: 'cierre' },
    { id: 3, title: 'Guía de Compras', description: 'Te hemos preparado una guía detallada sobre cómo organizar tus facturas de compras.', time: 'Hace 1 día', type: 'info', read: true },
  ]);

  // Sync state with LocalStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('formalia_user');
      const storedSales = localStorage.getItem('formalia_sales');
      const storedPurchases = localStorage.getItem('formalia_purchases');
      const storedMonedero = localStorage.getItem('formalia_monedero_acumulado');
      const storedMonederoHist = localStorage.getItem('formalia_monedero_history');
      const storedScore = localStorage.getItem('formalia_trust_score');
      const storedMissions = localStorage.getItem('formalia_roadmap_missions');
      const storedDocs = localStorage.getItem('formalia_vault_docs');
      const storedNotifs = localStorage.getItem('formalia_notifications');

      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedSales) setSales(JSON.parse(storedSales));
      if (storedPurchases) setPurchases(JSON.parse(storedPurchases));
      if (storedMonedero) setMonederoAcumulado(parseFloat(storedMonedero));
      if (storedMonederoHist) setMonederoHistory(JSON.parse(storedMonederoHist));
      if (storedScore) setTrustScore(parseInt(storedScore, 10));
      if (storedMissions) setRoadmapMissions(JSON.parse(storedMissions));
      if (storedDocs) setVaultDocuments(JSON.parse(storedDocs));
      if (storedNotifs) setNotifications(JSON.parse(storedNotifs));

      setIsLoaded(true);
    }
  }, []);

  // Save changes helper
  const saveState = (key, value, setter) => {
    setter(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  // Add Sale
  const addSale = (sale) => {
    const newSale = {
      // eslint-disable-next-line react-hooks/purity
      id: Date.now(),
      date: sale.date || new Date().toISOString().split('T')[0],
      amount: parseFloat(sale.amount),
      description: sale.description || 'Nueva venta registrada',
      type: sale.type || 'normal',
    };
    const updatedSales = [newSale, ...sales];
    saveState('formalia_sales', updatedSales, setSales);

    // If it's a normal sale, check if we need to progress Node 3 "Primera Declaración"
    if (roadmapMissions[2].status === 'locked') {
      unlockMission(3);
    }
  };

  // Edit Sale
  const editSale = (id, updatedSale) => {
    const updatedSales = sales.map((sale) =>
      sale.id === id
        ? { ...sale, ...updatedSale, amount: parseFloat(updatedSale.amount) }
        : sale
    );
    saveState('formalia_sales', updatedSales, setSales);
  };

  // Delete Sale
  const deleteSale = (id) => {
    const updatedSales = sales.filter((sale) => sale.id !== id);
    saveState('formalia_sales', updatedSales, setSales);
  };

  // Add Purchase
  const addPurchase = (purchase) => {
    const newPurchase = {
      id: Date.now(),
      date: purchase.date || new Date().toISOString().split('T')[0],
      ruc: purchase.ruc,
      factura: purchase.factura,
      amount: parseFloat(purchase.amount),
    };
    const updatedPurchases = [newPurchase, ...purchases];
    saveState('formalia_purchases', updatedPurchases, setPurchases);
  };

  // Edit Purchase
  const editPurchase = (id, updatedPurchase) => {
    const updatedPurchases = purchases.map((purchase) =>
      purchase.id === id
        ? { ...purchase, ...updatedPurchase, amount: parseFloat(updatedPurchase.amount) }
        : purchase
    );
    saveState('formalia_purchases', updatedPurchases, setPurchases);
  };

  // Delete Purchase
  const deletePurchase = (id) => {
    const updatedPurchases = purchases.filter((purchase) => purchase.id !== id);
    saveState('formalia_purchases', updatedPurchases, setPurchases);
  };

  // Add Quick Sale (<= S/ 5)
  const addQuickSale = (amount) => {
    const newAmount = monederoAcumulado + parseFloat(amount);
    saveState('formalia_monedero_acumulado', newAmount, setMonederoAcumulado);

    const updatedHistory = monederoHistory.map((day, idx) =>
      idx === 0 ? { ...day, amount: newAmount } : day
    );
    saveState('formalia_monedero_history', updatedHistory, setMonederoHistory);
  };

  // Simulate 8:00 PM Corte
  const triggerDailyCorte = () => {
    if (monederoAcumulado <= 0) return;

    const todayStr = new Date().toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Add to Sales list
    addSale({
      date: new Date().toISOString().split('T')[0],
      amount: monederoAcumulado,
      description: `Ventas menores del ${todayStr}`,
      type: 'normal',
    });

    // Archive current day in history
    const archivedDay = {
      date: new Date().toISOString().split('T')[0],
      amount: monederoAcumulado,
      status: 'finalizado',
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextDay = {
      date: tomorrow.toISOString().split('T')[0],
      amount: 0,
      status: 'en_curso',
    };

    const updatedHistory = [nextDay, archivedDay, ...monederoHistory.slice(1)];
    saveState('formalia_monedero_history', updatedHistory, setMonederoHistory);
    saveState('formalia_monedero_acumulado', 0, setMonederoAcumulado);

    // Remove notification about Box Cut
    const updatedNotifs = notifications.filter(n => n.action !== 'cierre');
    saveState('formalia_notifications', updatedNotifs, setNotifications);

    // Gain points
    addTrustPoints(50);
  };

  // Gain points for trust score
  const addTrustPoints = (points) => {
    const newScore = Math.min(1000, trustScore + points);
    saveState('formalia_trust_score', newScore, setTrustScore);
  };

  // Unlock / complete mission
  const unlockMission = (id) => {
    const updatedMissions = roadmapMissions.map((mission) => {
      if (mission.id === id) {
        return { ...mission, status: 'active' };
      }
      return mission;
    });
    saveState('formalia_roadmap_missions', updatedMissions, setRoadmapMissions);
  };

  const completeMission = (id) => {
    const updatedMissions = roadmapMissions.map((mission) => {
      if (mission.id === id) {
        addTrustPoints(mission.scoreReward);
        return { ...mission, status: 'completed' };
      }
      // Auto unlock next mission
      if (mission.id === id + 1 && mission.status === 'locked') {
        return { ...mission, status: 'active' };
      }
      return mission;
    });
    saveState('formalia_roadmap_missions', updatedMissions, setRoadmapMissions);
  };

  // Add Document to Vault
  const addDocument = (doc) => {
    const newDoc = {
      id: Date.now(),
      name: doc.name,
      size: doc.size || '1.0 MB',
      type: doc.type || 'pdf',
      date: new Date().toISOString().split('T')[0],
      fileUrl: '#',
    };
    const updatedDocs = [newDoc, ...vaultDocuments];
    saveState('formalia_vault_docs', updatedDocs, setVaultDocuments);
  };

  // Sign Document from Roadmap Step 2
  const signDocument = (docName) => {
    addDocument({
      name: docName,
      size: '850 KB',
      type: 'pdf',
    });
    completeMission(2);
  };

  // Notifications functions
  const markAllNotifsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveState('formalia_notifications', updated, setNotifications);
  };

  const deleteNotification = (id) => {
    const updated = notifications.filter(n => n.id !== id);
    saveState('formalia_notifications', updated, setNotifications);
  };

  // Reset session for a new user registration
  const resetUserSession = (completeMission1 = false) => {
    saveState('formalia_sales', [], setSales);
    saveState('formalia_purchases', [], setPurchases);
    saveState('formalia_monedero_acumulado', 0, setMonederoAcumulado);
    saveState('formalia_monedero_history', [], setMonederoHistory);
    saveState('formalia_vault_docs', [], setVaultDocuments);
    
    let initialScore = 0;
    const initialMissions = [
      { id: 1, title: 'Obtener RUC 10', status: 'active', scoreReward: 150 },
      { id: 2, title: 'Firma de Documentos (FUT)', status: 'locked', scoreReward: 100 },
      { id: 3, title: 'Primera Declaración Simplificada', status: 'locked', scoreReward: 150 },
      { id: 4, title: 'Mantener Historial de Ventas (3 meses)', status: 'locked', scoreReward: 200 },
    ];
    
    if (completeMission1) {
      initialScore = 150;
      initialMissions[0].status = 'completed';
      initialMissions[1].status = 'active';
    }
    
    saveState('formalia_trust_score', initialScore, setTrustScore);
    saveState('formalia_roadmap_missions', initialMissions, setRoadmapMissions);

    const welcomeNotification = [
      {
        id: 1,
        title: '¡Te damos la bienvenida a Formalia!',
        description: 'Tu portal para registrar ventas, compras y avanzar hacia el crecimiento formal.',
        type: 'info',
        time: 'Hace un momento',
        read: false
      }
    ];
    saveState('formalia_notifications', welcomeNotification, setNotifications);
  };

  // Update Profile / User Info
  const updateProfile = (fields) => {
    const { fromOnboarding, ...profileFields } = fields;
    const updatedUser = { ...user, ...profileFields };
    saveState('formalia_user', updatedUser, setUser);

    // If RUC added, complete Mission 1
    if (profileFields.ruc && profileFields.ruc.length === 11 && !fromOnboarding && roadmapMissions[0].status !== 'completed') {
      completeMission(1);
    }
  };

  // Calculations for current month
  const totalVentasMonth = sales
    .filter(s => {
      // In a real app we'd filter by month, for demo filter by sales loaded
      return s.date.includes('2026-06') || s.date.includes('2026-07');
    })
    .reduce((sum, s) => sum + s.amount, 0);

  const totalComprasMonth = purchases
    .reduce((sum, p) => sum + p.amount, 0);

  // Motor de cálculo
  const getProyecciónSunat = () => {
    const v = totalVentasMonth;
    const c = totalComprasMonth;

    if (v <= 5000 && c <= 5000) {
      return { categoria: 1, cuota: 20, status: 'success', color: '#10B981', label: 'Categoría 1' };
    } else if (v <= 8000 && c <= 8000) {
      return { categoria: 2, cuota: 50, status: 'warning', color: '#F59E0B', label: 'Categoría 2' };
    } else {
      return { categoria: null, cuota: 0, status: 'danger', color: '#EF4444', label: 'Excedido', alert: 'Exceso de tope mensual (Fuera del NRUS)' };
    }
  };

  const sunatInfo = getProyecciónSunat();

  return (
    <AppContext.Provider value={{
      isLoaded,
      user,
      currentMonth,
      setCurrentMonth,
      sales,
      purchases,
      monederoAcumulado,
      monederoHistory,
      trustScore,
      roadmapMissions,
      vaultDocuments,
      notifications,
      totalVentasMonth,
      totalComprasMonth,
      sunatInfo,
      addSale,
      editSale,
      deleteSale,
      addPurchase,
      editPurchase,
      deletePurchase,
      addQuickSale,
      triggerDailyCorte,
      addTrustPoints,
      completeMission,
      signDocument,
      markAllNotifsRead,
      deleteNotification,
      updateProfile,
      addDocument,
      resetUserSession,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
