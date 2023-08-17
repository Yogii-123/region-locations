// import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
// import './Form.css';


function FormPage(){
  const [data,setdata]=useState()
    const [filteredData,setfilteredData]=useState([]);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [circles, setCircles] = useState([]);
    const [selectedCircle, setSelectedCircle] = useState('');
    const [divisions, setDivisions] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState('');
    const [subdivisions, setSubdivisions] = useState([]);
    const [selectedSubdivision, setSelectedSubdivision] = useState('');
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState('');


    
 

// useEffect(()=>{
    //     const fetchData=async()=>{
    //         const response=await fetch(`http://localhost:9005/get`)
    //         // const filteredData=await getFilteredData('sample','region')
    //         const newData=await response.json();
    //         console.log(newData);
    //         setfilteredData(await newData);
    //     };
    //     fetchData();
    //     // getdata();
    // },[])


    useEffect(()=>{
        const fetchData=async()=>{
            try{
            const response=await fetch(`http://localhost:9005/get`)
            const newData=await response.json();
            const uniqueData=newData.filter((item,index,self)=>index === self.findIndex((t)=>(
                t.region === item.region
            )));

            console.log(uniqueData);
            setfilteredData(uniqueData);
            setdata(newData);

        //   const uniquesectios=newData.filter((item7,index,self)=>index === self.findIndex((tr)=>(
        //     tr.section === item7.section
        // )));
        // console.log(uniquesectios);
        // setSections(uniqueData);

        }
            catch (err) {
                console.log(err);
            }
        };
        fetchData();
    },[])
   
      
      const getCircles = region => {
        const uniqueData1=data.filter((item,index,self)=>index === self.findIndex((t)=>(
          t.circle === item.circle
      )));
        const filteredCircles = uniqueData1.filter(item => item.region === region);
        setCircles(filteredCircles);
  //         // Reset the state variables for division, subdivision, and section
  // setDivisions([]);
  // setSelectedDivision('');
  // setSubdivisions([]);
  // setSelectedSubdivision('');
  // setSections([]);

      };

      const getDivisions = (region, circle) => {
        const uniqueData5=data.filter((item,index,self)=>index === self.findIndex((t)=>(
          t.division === item.division
      )));

        const filteredDivisions = uniqueData5.filter(item => item.region === region && item.circle === circle);
        setDivisions(filteredDivisions);

  //         // Reset the state variables for subdivision and section
  // setSubdivisions([]);
  // setSelectedSubdivision('');
  // setSections([]);

      };

      const getSubdivisions = (region, circle, division) => {
        const uniqueData3=data.filter((item,index,self)=>index === self.findIndex((t)=>(
          t.subdivision === item.subdivision
      )));

        const filteredSubdivisions = uniqueData3.filter(item => item.region === region && item.circle === circle && item.division === division);
        setSubdivisions(filteredSubdivisions);
  //         // Reset the state variable for section
  // setSections([]);
  // setSelectedSection('');

      };

      
      const getSections = (region, circle, division, subdivision) =>{
        // if(!subdivision){
        const filteredSections = data.filter(item => item.region === region && item.circle === circle && item.division === division && item.subdivision === subdivision);
        setSections(filteredSections);

        // setSelectedSubdivision(subdivision);
      // }else{
      //   const filteredSections = data.filter(item => item.region === region && item.circle === circle && item.division === division && item.subdivision === subdivision);
      //   setSections(filteredSections);
      // }
    };

    //   useEffect(()=>{
    //     const fetchData2=async()=>{
    //       try{
    //         const response2=await fetch(`http://localhost:9005/get`)
    //         const newData2=await response2.json();
    //         console.log(newData2);
    //         setSections1(await newData2);
    //       }
    //       catch (err) {
    //         console.log(err);
    //     }
    //     };
    //     fetchData2();
    // },[setSections1])


    //   useEffect(()=>{
    //     const fetchData2=async()=>{
    //         const response2=await fetch(`http://localhost:9005/get`)
    //         // const filteredData=await getFilteredData('sample','region')
    //         const newData2=await response2.json();
    //         console.log(newData2);
    //         setSections(await newData2);
    //     };
    //     fetchData2();
    // },[])

    // useEffect(() => {
    //   if (selectedSubdivision !== '') {
    //     const filteredsections = data.find(item => item.region === selectedRegion && item.circle === selectedCircle && item.division === selectedDivision && item.subdivision === selectedSubdivision && item.section === selectedSection);
    //     setfilteredSections(filteredsections);
    //   }
    // }, [selectedSubdivision,selectedDivision,]);

    useEffect(() => {
      // find the corresponding data object for the selected section
      const selectedSectionData = data.find(
        item =>
          item.region === selectedRegion &&
          item.circle === selectedCircle &&
          item.division === selectedDivision &&
          item.subdivision === selectedSubdivision &&
          item.section === selectedSection
      );
    
      // set the values for the previous dropdowns based on the selected section's data
      if (selectedSectionData) {
        setSelectedSubdivision(selectedSectionData.subdivision);
        setSelectedDivision(selectedSectionData.division);
        setSelectedCircle(selectedSectionData.circle);
        setSelectedRegion(selectedSectionData.region);
      }
    }, [selectedSection]);
    

    
    return(
        <div>
                <div className="container">
        <header>Register</header>

        <form action="">
            <div className="form first">
                

                <div className="details ID">
                    <span className="title">Location Details</span>

                    <div className="fields">
                        <div className="input-field">
                            <label htmlFor="reg">Region</label>
                            <select name="region" onChange={e => {
  setSelectedRegion(e.target.value);
  getCircles(e.target.value);
}}>
                                <option value=''>--select region--</option>
                            {filteredData.map((item,index)=>(
                                    <option key={index} value={item.region}>{item.region}</option>

                                 ))}
                            </select>
                        </div>

                        <div className="input-field">
                            <label>Circle</label>
                            <select required name="circle" onChange={e => {
  setSelectedCircle(e.target.value);
  getDivisions(selectedRegion, e.target.value);
}}>
                            <option value="">--Select Circle--</option>
                            {circles.map((item)=>(
                                    <option key={item.circle_code} value={item.circle}>{item.circle}</option>

                                 ))}

      </select>
      </div>

                        <div className="input-field">
                            <label>Division</label>
                            <select name="division" required id="division-select" onChange={e => {
      setSelectedDivision(e.target.value);
      getSubdivisions(selectedRegion, selectedCircle, e.target.value);
    }}>
                                <option>--Select Division-- </option>
                                {divisions.map((divisions,index)=>(
                                    <option key={index} value={divisions.division}>{divisions.division}</option>

                                 ))}

                            </select>
                        </div>

                        <div className="input-field">
                            <label>Sub-Division</label>
                            <select name="subdivision"  onChange={e => {
      setSelectedSubdivision(e.target.value);
      // setfilteredSections([]);
      // setSelectedSection(' ');
      getSections(selectedRegion, selectedCircle, selectedDivision, e.target.value);
    }}>
                                <option selected>--Select subdivision-- </option>
                                {subdivisions.map((item2)=>(
                                    <option key={item2.subdivision_code} value={item2.subdivision}>{item2.subdivision}</option>

                                 ))}

                            </select>
                        </div>

                        <div className="input-field">
                            <label>Section</label>
                            <select  name="section"  required id="section-select" onChange={e => {setSelectedSection(e.target.value);}}>
                                <option>--Select section-- </option>
                                {sections.map((item4)=>(
                                    <option key={item4.section_code} value={item4.section}>{item4.section}</option>

                                 ))}
                                 {/* {filteredsections.length === 0 ?(sections.map(item4=>
                                 <option key={item4.section_code} value={item4.section}>{item4.section}</option>)):(
                                  filteredsections.map(item4=>
                                    <option key={item4.section_code} value={item4.section}>{item4.section}</option>)
                                 )} */}


                            </select>


                            {/* <select  onChange={e => {
  setSelectedSection(e.target.value);
  getSections(selectedRegion, selectedCircle, selectedDivision, selectedSubdivision);
}}>
  <option value="">Select Section</option>
  {selectedSubdivision
    ?  sections.map((item4)=>(
      <option key={item4.section_code} value={item4.section}>{item4.section}</option>

   ))

    : sections1.map(item5 => (
        <option key={item5.section_code} value={item5.section}>
          {item5.section}
        </option>
      ))}
</select> */}
                        </div>

                        <select
  value={selectedSection}
  onChange={e => setSelectedSection(e.target.value)}
>
  <option value="">Select Section</option>
  {sections.map(sections => (
    <option key={sections.section_code} value={sections.section}>
      {sections.section}
    </option>
  ))}
</select>

                        
                    </div>
                </div>
            </div>
        </form>
      </div>

        </div>
    )
}
export default FormPage;