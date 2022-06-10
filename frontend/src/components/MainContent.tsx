import React from "react";
import {Routes, Route} from "react-router-dom";
import {Content} from "antd/lib/layout/layout";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "../contexts/PrivateRoute";
import FullList from "../pages/full-list/FullList";
import MyCreatedList from "../pages/MyCreatedList";
import AssignedToMeList from "../pages/AssignedToMeList";
import TopTasks from "../pages/TopTasks";

export const MainContent = () => (
        <Content className='content-wrapper'>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <FullList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/my-created"
                    element={
                        <PrivateRoute>
                            <MyCreatedList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/assigned-to-me"
                    element={
                        <PrivateRoute>
                            <AssignedToMeList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/top-date"
                    element={
                        <PrivateRoute>
                            <TopTasks />
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
