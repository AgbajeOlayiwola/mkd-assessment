import React from "react"
import { useDrag, useDrop } from "react-dnd"
import img from "../Assets/Rectangle.png"
import UpSvg from "../SVGs/upSvg"
import "./styles.css"
const Tile = ({ id, title, image, username, like, moveTile }) => {
  const [, drag] = useDrag({
    type: "TILE",
    item: { id },
  })

  const [, drop] = useDrop({
    accept: "TILE",
    hover: (draggedItem) => {
      if (draggedItem.id !== id) {
        moveTile(draggedItem.id, id)
      }
    },
  })
  return (
    <>
      <div
        className="tile"
        ref={(node) => drag(drop(node))}
        style={{ border: "1px solid #000", margin: "10px", padding: "10px" }}
      >
        <div className="tileInner">
          <div className="tilediv1">
            <p className="numP">{id}</p>
          </div>
          <img
            className="tilediv2"
            src={image}
            width={118}
            height={34}
            alt="User Image"
            style={{ color: "white" }}
          />
          <div className="tilediv3">
            <h3 className="descH3">{title}</h3>
          </div>
        </div>
        <div className={"tileSec"}>
          <div>
            <img
              className="userImage"
              src={img}
              width={24}
              height={34}
              alt="image"
            />
            <div>
              <p className="nameP">{username}</p>
            </div>
          </div>
          <div>
            <div>
              <p className="numRank">{like}</p>
            </div>
            <UpSvg />
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  )
}

export default Tile
