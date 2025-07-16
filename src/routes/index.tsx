import React from 'react';
import { Routes, Route } from 'react-router-dom';

import RouteWrapper from './RouteWrapper';

import Login from '~/pages/Login';
import Clients from '~/pages/Clients';
import SelectedClients from '~/pages/SelectedClients';

const routes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RouteWrapper element={<Login />} />} />
      <Route
        path="/clientes"
        element={<RouteWrapper element={<Clients />} isPrivate />}
      />
      <Route
        path="/clientes-selecionados"
        element={<RouteWrapper element={<SelectedClients />} isPrivate />}
      />
    </Routes>
  );
};

export default routes;
