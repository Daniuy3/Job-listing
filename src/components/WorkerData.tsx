import { Works } from "../Types/Types";
import "./WorkerData.css";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion"

type WorkerDataProps = {
  worker : Works,
  key: number,
  filters : string[],
  setFilters: React.Dispatch<React.SetStateAction<string[]>>
} 

function WorkerData({worker, filters, setFilters} : WorkerDataProps) {

  const languajes = worker.languages;
  const tools  = worker.tools;

  const skilss = [...languajes, ...tools]

  function addFilter(skill:string){
    const skillExists = filters.includes(skill);
    if(!skillExists){
      setFilters([...filters, skill])
    }
  }
  return (
    <motion.div 
    initial = {{opacity : 0, x:-300}}
    animate = {{opacity: 1, x: 0}}
    transition={{duration: 1}}
      className="worker" 
      key={uuidv4()}
    >
      
       <div className="worker__container">
       <div className="worker__logo">
          <img src={worker.logo} alt="Logo" />
        </div>
        <div className="worker__features-container">
        <p className="worker__features">
          {worker.company}{" "}
          {worker.new? <span className="new">New!</span> : ""}
          {worker.featured? <span className="featured">FEATURED</span> : ""}
        </p>
        <p className="worker__position">
          {worker.position}
        </p>
        <p className="worker__meta">
          {worker.postedAt}
          {<span>-</span>}
          {worker.contract}
          {<span>-</span>}
          {worker.location}
        </p>
        </div>
       </div>

        <div className="skills">
          {skilss.map(skill => (
            <p 
              key={uuidv4()}
              onClick={() => addFilter(skill)}
            >
              {skill}
            </p>
          ))}
        </div>

    </motion.div>
  )
}

export default WorkerData