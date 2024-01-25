import React, { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Cover from "../components/Cover"
import NavBar from "../components/NavBar"
import Tile from "../components/Tile"
import MkdSDK from "../utils/MkdSDK"

const AdminDashboardPage = () => {
  // Initialize variables for pagination
  const [allData, setAllData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  let sdk = new MkdSDK()

  const itemsPerPage = 10

  // Function to load items

  const loadItems = async (page) => {
    try {
      const payload = {
        page: page,
        limit: itemsPerPage,
      }

      const result = await sdk.callRestAPI(payload, "PAGINATE")
      setAllData(result?.list)
    } catch (error) {
      console.error(`Error loading items on page ${page}:`, error)
    }
  }

  // Function to load next page
  const loadNextPage = async () => {
    try {
      const nextPage = currentPage + 1
      await loadItems(nextPage)

      setCurrentPage(nextPage)
    } catch (error) {
      console.error("Error loading next page:", error)
    }
  }

  // Function to load previous page
  const loadPrevPage = async () => {
    try {
      if (currentPage > 1) {
        const prevPage = currentPage - 1
        await loadItems(prevPage)

        setCurrentPage(prevPage)
      }
    } catch (error) {
      console.error("Error loading previous page:", error)
    }
  }

  useEffect(() => {
    loadItems(currentPage)
  }, [currentPage])

  const moveTile = (fromId, toId) => {
    // Find the index of the dragged tile
    const fromIndex = allData.findIndex((tile) => tile.id === fromId)

    // Find the index of the tile being dragged over
    const toIndex = allData.findIndex((tile) => tile.id === toId)

    // Create a new array with the tiles reordered
    const newTiles = [...allData]
    newTiles.splice(toIndex, 0, newTiles.splice(fromIndex, 1)[0])

    // Update the state with the new order of tiles
    setAllData(newTiles)
  }
  return (
    <div className="bg-black h-screen pb-20 overflow-scroll">
      <div className="w-full h-screen text-gray ">
        <Cover>
          <NavBar />
          <div className="flex w-1216 h-88 px-0 justify-between items-center gap-433 flex-shrink-0">
            <div>
              <h1 className="text-white text-4xl font-inter font-thin leading-48">
                Today’s leaderboard
              </h1>
            </div>
            <div className="flex justify-space-between items-center">
              <div>
                <p>30 May 2022</p>
              </div>
              <div className="inline-flex p-2 justify-center items-center gap-2 rounded-lg bg-primary">
                <p>Submissions OPEN</p>
              </div>
              <div>
                <p>11:34</p>
              </div>
            </div>
          </div>
          <br />
          <div className="flex px-0 justify-between">
            <div className="flex gap-10">
              <p className="text-white  font-inter text-16 font-thin leading-normal">
                #
              </p>
              <p className="text-white  font-inter text-16 font-thin leading-normal">
                Title
              </p>
            </div>
            <p className="text-white  font-inter text-16 font-thin leading-normal">
              Author
            </p>
            <div className="flex gap-10">
              <p className="text-white font-inter text-16 font-thin leading-normal">
                Most Viewd
              </p>
              <p className="text-Greyscale-700 font-inter text-16 font-thin leading-normal">
                /
              </p>
            </div>
          </div>
          <br />
          {allData?.length > 0 ? (
            <DndProvider backend={HTML5Backend}>
              {allData.map((item) => (
                <Tile
                  key={item?.id}
                  id={item?.id}
                  title={item?.title}
                  image={item?.photo}
                  username={item?.username}
                  like={item?.like}
                  moveTile={moveTile}
                />
              ))}
            </DndProvider>
          ) : null}
          <div className="flex px-0 justify-between">
            <button className="text-white" onClick={loadPrevPage}>
              Previous
            </button>
            <button className="text-white" onClick={loadNextPage}>
              Next
            </button>
          </div>
        </Cover>
      </div>
    </div>
  )
}

export default AdminDashboardPage
