import React from 'react'
import { Navigate, useNavigation } from 'react-router-dom'

function Index() {
	// const goto = useNavigation()
	// goto("/dashboard")
	return <Navigate to="/dashboard" />
}

export default Index
