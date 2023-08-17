import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddForm(){
    const [region, setRegion] = useState('');
    const [circle, setCircle] = useState('');
    const [division, setDivision] = useState('');
    const [subdivision, setSubdivision] = useState('');
    const [section, setSection] = useState('');
  
    function handleSubmit(e){
      e.preventDefault();
      axios.post(`http://localhost:9005/postdata`,
      {
        region:region,
        circle:circle,
        division:division,
        subdivision:subdivision,
        section:section
      }).then((res) =>{
        console.log(res.data);
        navigator("/Table")
      })
        setRegion('');
      setCircle('');
      setDivision('');
      setSubdivision('');
      setSection('');
    };
  
    return(
        <div>
                <form onSubmit={handleSubmit}>
      <div>
        <label>Region:</label>
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
      </div>

      <div>
        <label>Circle:</label>
        <input
          type="text"
          value={circle}
          onChange={(e) => setCircle(e.target.value)}
        />
      </div>

      <div>
        <label>Division:</label>
        <input
          type="text"
          value={division}
          onChange={(e) => setDivision(e.target.value)}
        />
      </div>

      <div>
        <label>Subdivision:</label>
        <input
          type="text"
          value={subdivision}
          onChange={(e) => setSubdivision(e.target.value)}
        />
      </div>

      <div>
        <label>Section:</label>
        <input
          type="text"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>


        </div>
    )
}
export default AddForm;