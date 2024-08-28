import React, { Component } from "react"
import AppRouter from "./router/AppRouter"
import { Route, Routes } from "react-router-dom"

export default class App extends Component{
  render() {
    return (
      <Routes>
        <Route path={"/*"} element={<AppRouter/>}/>
      </Routes>
    )
  }
}