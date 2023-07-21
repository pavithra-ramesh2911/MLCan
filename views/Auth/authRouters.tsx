import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterForm from "../../views/Auth/RegisterForm";
import LoginForm from "../../views/Auth/LoginForm";
import { RouterProps } from "../../shared/types/route.type";
import { AppRoutes, NavigationRoutes } from "../../routes/routeConstants/appRoutes";

const authRouter = () => {
  const routes: RouterProps[] = [
    { path: AppRoutes.REGISTER, component: <RegisterForm/> },
    { path: AppRoutes.LOGIN, component: <LoginForm/> },
  ];

  return (
    <Routes>

      {routes.map(({ component, ...routerProps }, index) => (
        <Route key={index} element={component} {...routerProps} />
      ))}
    </Routes>
  );
};

export default authRouter;
