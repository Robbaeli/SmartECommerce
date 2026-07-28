import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSaveView from '../../components/views/AppSaveView'
import HomeHeader from '../../components/headers/HomeHeader'
import { AppFonts } from '../../styles/fonts'
import ProductCard from '../../components/cards/ProductCard'

const HomeScreen = () => {
  return (
    <AppSaveView>
      <HomeHeader />
      <ProductCard />
      
    </AppSaveView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})