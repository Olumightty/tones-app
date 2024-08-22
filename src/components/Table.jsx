import { setQueue } from "@/redux/features/playerSlice"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import SongRow from "./SongRow"
import { Clock10 } from "lucide-react"
import {
  Table as TableWrap,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const Table = ({songs, artistId}) =>{
    const [playFromAlbum, setPlayFromAlbum] = useState(false)
    const dispatch = useDispatch()
  
    // const newQueue = () =>{
    //   dispatch(setQueue({ //this also will be in tr component
    //     id: song.id,
    //     title: song.attributes?.name,
    //     artist: song.attributes?.artistName,
    //     audio: song.attributes?.previews[0]?.url,
    //     artistId: route == 'album' ? artistId : song.relationships?.artists?.data[0]?.id,
    //     imageUrl: song.attributes?.artwork?.url.replace("{w}", "400").replace("{h}", "400"),
    //   }))
    // }
  
    useEffect(() => {
      playFromAlbum
        ? dispatch(setQueue(songs.map((song, index) => {
            return {
              index,
              id: song.id,
              title: song.attributes?.name,
              artist: song.attributes?.artistName,
              audio: song.attributes?.previews[0]?.url,
              artistId: artistId,
              imageUrl: song.attributes?.artwork?.url.replace("{w}", "400").replace("{h}", "400"),
            }
          })))
        : null
        setPlayFromAlbum(false)
    }, [playFromAlbum])
    
    return(
      <div className="max-h-[50vh] sm:max-h-[75vh] overflow-scroll removeScrollbar sm:vertical-scroll max-sm:max-w-[calc(100vw-100px)]">
        <TableWrap className='w-full overflow-y-auto table'>
        <TableHeader>
          <TableRow>
              <TableHead className='text-gold font-Poppins font-semibold sticky top-0'>#</TableHead>
              <TableHead  className='text-gold font-Poppins font-semibold sticky top-0'>Song Title</TableHead>
              <TableHead  className='text-gold font-Poppins font-semibold sticky top-0 max-xs:hidden'>Album</TableHead>
              <TableHead  className='text-gold font-Poppins font-semibold max-sm:hidden sticky top-0'>Genre</TableHead>
              <TableHead  className='text-gold font-Poppins font-semibold sticky top-0'><Clock10 /></TableHead >
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song, index) => <SongRow setPlayFromAlbum={setPlayFromAlbum} artistId={artistId} key={index} song={song} index={index}/>)}
        </TableBody>
      </TableWrap>
    </div>  
  
    )
  }