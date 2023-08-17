import { useEffect } from "react";
import { useState } from "react";
import './Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Form(){
  // const navigate=useNavigate();
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [circles, setCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState('');
  const [divisions, setDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [subdivisions, setSubdivisions] = useState([]);
  const [selectedSubdivision, setSelectedSubdivision] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');

  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:9005/get');
      const data = await response.json();
      setFilteredData(data);
      const uniqueRegions = [...new Set(data.map(item => item.region))];
      setRegions(uniqueRegions);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData1 = async () => {
    try {
      const response1 = await fetch('http://localhost:9005/get');
      const data1 = await response1.json();
      setFilteredData(data1);
      const uniqueRegions1 = [...new Set(data1.map(item1 => item1.section))];
      setSections(uniqueRegions1);
    } catch (err) {
      console.log(err);
    }
  };


  const getCircles = region => {
    const uniqueData1=filteredData.filter((item,index,self)=>index === self.findIndex((t)=>(
      t.circle === item.circle
  )));

    const filteredCircles = uniqueData1.filter(item => item.region === region).map(item => item.circle);
    setCircles(filteredCircles);
    setSelectedCircle('');
    setDivisions([]);
    setSelectedDivision('');
    setSubdivisions([]);
    setSelectedSubdivision('');
    setSections([]);
    setSelectedSection('');
  };

  const getDivisions = (region, circle) => {
    const uniqueData5=filteredData.filter((item,index,self)=>index === self.findIndex((t)=>(
      t.division === item.division
  )));

    const filteredDivisions = uniqueData5.filter(item => item.region === region && item.circle === circle).map(item => item.division);
    setDivisions(filteredDivisions);
    setSelectedDivision('');
    setSubdivisions([]);
    setSelectedSubdivision('');
    setSections([]);
    setSelectedSection('');
  };

  const getSubdivisions = (region, circle, division) => {
    const uniqueData3=filteredData.filter((item,index,self)=>index === self.findIndex((t)=>(
      t.subdivision === item.subdivision
  )));
    const filteredSubdivisions = uniqueData3.filter(item => item.region === region && item.circle === circle && item.division === division).map(item => item.subdivision);
    setSubdivisions(filteredSubdivisions);
    setSelectedSubdivision('');
    setSections([]);
    setSelectedSection('');
  };

  const getSections = (region, circle, division, subdivision) => {
    const filteredSections = filteredData.filter(item => item.region === region && item.circle === circle && item.division === division && item.subdivision === subdivision).map(item => item.section);
    setSections(filteredSections);
    setSelectedSection('');
  };

  useEffect(() => {
    fetchData();
  }, []);



  useEffect(() => {
    fetchData1();
  }, []);

  useEffect(() => {
    if (selectedSection) {
      const selectedItem = filteredData.find(item => item.section === selectedSection);
      setSelectedSubdivision(selectedItem.subdivision);
      setSelectedDivision(selectedItem.division);
      setSelectedCircle(selectedItem.circle);
      setSelectedRegion(selectedItem.region);

      // Get circles for the selected region
    const filteredCircles = filteredData.filter(item => item.region === selectedItem.region).map(item => item.circle);
    setCircles(filteredCircles);

    // Get divisions for the selected region and circle
    const filteredDivisions = filteredData.filter(item => item.region === selectedItem.region && item.circle === selectedItem.circle).map(item => item.division);
    setDivisions(filteredDivisions);

    // Get subdivisions for the selected region, circle and division
    const filteredSubdivisions = filteredData.filter(item => item.region === selectedItem.region && item.circle === selectedItem.circle && item.division === selectedItem.division).map(item => item.subdivision);
    setSubdivisions(filteredSubdivisions);
    }
  }, [selectedSection]);
  
    return(

        <div  className="container">
                <div className="section_top">

          <form>
          <div className="content"></div>

          <div className="row">
        <div className="column">
                <select onChange={e => {
        setSelectedRegion(e.target.value);
        getCircles(e.target.value);
      }} value={selectedRegion}>
        <option value="">Select Region</option>
        {regions.map(region => <option key={region} value={region}>{region}</option>)}
      </select>
      </div>
      <br></br>

      <div className="column">
      <select onChange={e => {
        setSelectedCircle(e.target.value);
        getDivisions(selectedRegion, e.target.value);
      }} value={selectedCircle}>
        <option value="" className="row1">Select Circle</option>
        {circles.map(circle => <option key={circle} value={circle}>{circle}</option>)}
      </select>
      </div></div>
      <br></br>

      <div className="row">
        <div className="column">
      <select onChange={e => {
        setSelectedDivision(e.target.value);
        getSubdivisions(selectedRegion, selectedCircle, e.target.value);
      }} value={selectedDivision}>
        <option value="">Select Division</option>
        {divisions.map(division => <option key={division} value={division}>{division}</option>)}
      </select>
      </div>
      <br></br>

   <div className="column">
      <select onChange={e => {
        setSelectedSubdivision(e.target.value);
        getSections(selectedRegion, selectedCircle,selectedDivision, e.target.value);
      }} value={selectedSubdivision}>
        <option value="">Select SubDivision</option>
        {subdivisions.map(subdivision => <option key={subdivision} value={subdivision}>{subdivision}</option>)}
      </select>
      </div>
      </div>
      <br></br>

      {/* <div className="row"> */}
      <div className="column">
      <select onChange={e => {
        setSelectedSection(e.target.value);
        // getSections(selectedRegion, selectedCircle,selectedDivision, e.target.value);
      }} value={selectedSection}>
        <option value="" style={{width:5}} >Select section</option>
        {sections.map(section => <option key={section} value={section}>{section}</option>)}
      </select>
      {/* </div> */}
      </div>
      <br></br>

      {/* <button onClick={()=>navigate('/AddForm')}>Add Locations</button> */}





                  {/* <select value={selectedSection} onChange={e => setSelectedSection(e.target.value)}>
        <option value="">All Sections</option>
        {sections.map(section => (
          <option key={section} value={section}>
            {section}
          </option>
        ))}
      </select>
      <select value={selectedSubdivision} onChange={e => setSelectedSubdivision(e.target.value)}>
        <option value="">All Subdivisions</option>
        {subdivisions.map(subdivision => (
          <option key={subdivision} value={subdivision}>
            {subdivision}
          </option>
        ))}
      </select> */}
      {/* <ul>
        {filteredData.map(item => (
          <li key={item.id}>
          </li>
        ))}
      </ul> */}
            {/* <select value={selectedSubdivision} onChange={e => {setSelectedSubdivision(e.target.value);getSections(selectedRegion, selectedCircle, selectedDivision, e.target.value);
}}>
        <option value="">All Subdivisions</option>
        {subdivisions.map(subdivision => (
          <option key={subdivision} value={subdivision}>
            {subdivision}
          </option>
        ))}
      </select> */}

      {/* <select value={selectedDivision} onChange={e =>{setSelectedDivision(e.target.value);
          getSubdivisions(selectedRegion, selectedCircle, e.target.value);
        }}>
        <option value="">All divisions</option>
        {divisions.map(division => (
          <option key={division} value={division}>
            {division}
          </option>
        ))}
      </select>

      <select value={selectedCircle} onChange={e =>{ setSelectedCircle(e.target.value);
      getDivisions(selectedRegion, e.target.value);
    }}>
        <option value="">All circle</option>
        {circles.map(circle => (
          <option key={circle} value={circle}>
            {circle}
          </option>
        ))}
      </select>

      <select value={selectedRegion} onChange={e => {setSelectedRegion(e.target.value);
      getCircles(e.target.value)}}>
        <option value="">All region</option>
        {regions.map(regions => (
          <option key={regions} value={regions}>
            {regions}
          </option>))}
      </select> */}


</form>
</div>


        </div>
    )
}
export default Form;