import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function ProtectRoutes() {
	const auth = useSelector((state) => state.auth);
	console.log(auth);
	if (auth.user == null) {
		return <Navigate to="/login" replace="true" />;
	} else {
		return <Outlet />;
	}
}

export default ProtectRoutes;
