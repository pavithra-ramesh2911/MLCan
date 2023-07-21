import React from "react";
import { Route, Router, Routes, Navigate } from "react-router-dom";
import Container from './Container';
import Customer from "./Customer";
import Repairlist from "./Repairlist";
import Usermanagement from "./Usermanagement";
import ContainerDetails from "./Container/containerDetails";
import { AppRoutes } from "../../routes/routeConstants/appRoutes";




const Home = (props: any) => {

    let navRoutes = [
        { path: AppRoutes.CONTAINERS, component: <Container/> },
        { path: AppRoutes.CUSTOMERS, component: <Customer/>},
        { path: AppRoutes.REPAIR_LIST, component: <Repairlist/>},
        { path: AppRoutes.USER_MANAGEMENT, component: <Usermanagement/>},
        { path: AppRoutes.CONTAINER_DETAILS, component: <ContainerDetails/>}


      ];
    
    return (
        <div>
          <Routes>
          {navRoutes.map((route, index) => {
            return (
              <Route key={index} path={route.path} element={route.component} />
            );
          })}
          
        </Routes>
        </div>
    )
}

export default Home;
