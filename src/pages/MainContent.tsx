import React from "react";
import {Routes, Route} from "react-router-dom";
import {Content} from "antd/lib/layout/layout";
import NotFoundPage from "./NotFoundPage";
import PrivateRoute from "../contexts/PrivateRoute";

export const MainContent = () => (
        <Content>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <div>saassasasa</div>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="*"
                    element={
                        <PrivateRoute>
                            <NotFoundPage/>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Content>
);
