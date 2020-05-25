import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import Articles from "./components/articles"
import Pagination from "./components/pagination"
import './App.css'

const App = () => { 

  //replace with your own API key or env file
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`

  //React Hooks to set pagination and loaded articles
  const [articles, setArticles] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [articlesPerPage] = useState(3)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  //the Hook equivalent of componentDidMount
  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      setArticles(data.articles)
    })
  }, [])

  //get the indices for pagination
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)

  return (
    <div>
      <center className="d-block mt-3"><h1 className="font-weight-bold text-white">Newsie<FontAwesomeIcon icon={faNewspaper} size="lg" className="ml-3"/></h1></center>
      <center><p className="text-white">Your Source for Sports News™</p></center>
      <Articles articles={currentArticles}/>
      <Pagination articlesPerPage={articlesPerPage} totalArticles={articles.length} paginate={paginate}/>  
    </div>
  )
}

export default App
