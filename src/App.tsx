
import { useEffect, useState } from 'react'
import './App.css'
import { Works } from './Types/Types'
import WorkerData from './components/WorkerData'
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion} from "framer-motion";

function App() {

  const [filters, setFilters] = useState<string[]>([])
  const [datos, setDatos] = useState<Works[]>([])
  const lenght = filters.length;
  useEffect(() => {
    fetch("./../data.json")
    .then(respuesta => respuesta.json())
    .then(resultado => setDatos(resultado))

  }, [])
  
  useEffect( () => {
      filters.forEach(filter => {
        filtraDatos(filter)
      })
    
  }, [filters])

  async function removeFilter (filter : string){
    await fetch("./../data.json")
    .then(respuesta => respuesta.json())
    .then(resultado => setDatos(resultado))

    let newFilters : string[] = []

    filters.forEach(newFilter =>{
      const sameFilter = newFilter === filter
      
      if(!sameFilter){
        newFilters = [...newFilters, newFilter]
      }
    })
  
    setFilters([...newFilters])
    
  
  }
  function limpiaFiltros () {
    fetch("./../data.json")
    .then(respuesta => respuesta.json())
    .then(resultado => setDatos(resultado))
    setFilters([])
  }
    function filtraDatos (filter : string){
      const updatedDatos = [...datos];
      let newDatos : Works[] = []

      updatedDatos.forEach(dato => {
        const skills = [...dato.languages, ...dato.tools]
        if(skills.includes(filter)){
          newDatos = [...newDatos, dato]
        }
      })

      setDatos([...newDatos])
    }
  return (
    <>
      <div className='hero'>
        <img src="/bg-header-desktop.svg" alt="" />

        {lenght > 0? 
        <AnimatePresence>
          <motion.div 
            className='filters'
            initial = {{opacity: 0}}
            animate = {{opacity: 1}}
            exit={{opacity:0}}
            transition={{duration: 0.4}}
          >

            <motion.div 
              className="filters__grid"
            >
              {filters.map(filter => (
                <div className='filters__filter' key={uuidv4()}>
                  <p >{filter}</p>
                  <div 
                    className='filters__close'
                    onClick={() => removeFilter(filter)}
                  >
                    <img src="/icon-remove.svg" alt="" />
                  </div>
                </div>
               ))}
            </motion.div>

            <div 
              className="clear"
               onClick={limpiaFiltros}
            >
              Clear
            </div>

          </motion.div> 
        </AnimatePresence>
          : null}

      </div>
      
      <div className="works">
        {datos.map(worker => (
          <WorkerData
            worker={worker}
            key={worker.id}
            filters= {filters}
            setFilters = {setFilters}
          />
        ))}
      </div>
    </>
  )
}

export default App
