import React, { useState } from 'react';
import './App.css'

function App() {
  const [formData, setFormData] = useState ({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    residentialAddress: {
      street1: '',
      street2: '',
    },
    permanentAddress: {
      street1: '',
      street2: '',
    },
    sameAsResidential: false,
    documents: [],
  });
  const [residentialAddress, setResidentialAddress] = useState({
    street1: '',
    street2: '',
  });
  const [permanentAddress, setPermanentAddress] = useState({
    street1: '',
    street2: '',
  });
  const [inputFile, setInputFile] = useState([{ id: 1, file_name: '', file_type: '', file: File }]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateOfBirth') {
      let years = Math.floor((new Date().getTime() - new Date(value).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
      if (years < 18) {
        alert(`Minimum age should be 18 years.${years}`)
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      formData.sameAsResidential = e.target.checked;
      setPermanentAddress(residentialAddress);
    } else {
      setPermanentAddress({
        street1: '',
        street2: '',
      });
    }
  };

  const inputFileChange = (e) => {
    const { name, value } = e.target;
    setInputFile(localData => ({ ...localData, [name]: value }));
  };

  const handleFileTypeChange = (e) => {
    const { name, value } = e.target;
    setInputFile(localData => ({ ...localData, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files) {
      console.log(files);

      const updatedDocuments = [...formData.documents];
      for (let i = 0; i < files.length; i++) {
        updatedDocuments.push({
          file: files[i],
          fileName: files[i].name,
          fileType: files[i].type,
        });
      }
      setFormData({
        ...formData,
        documents: updatedDocuments,
      });
    }
  };

  const handleAddField = () => {
    // formData.documents.push(inputFile);
    setInputFile([...inputFile, { id: inputFile.length + 1, file_name: '', file_type: '', file: File }]);
  };

  const handleRemoveField = (id) => {
    const updatedFields = inputFile.filter((field) => field.id !== id);
    setInputFile(updatedFields);
  };
  console.log(inputFile);

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.residentialAddress = residentialAddress;
    formData.permanentAddress = permanentAddress;
    // Handle form submission and verification
    console.log(formData);
  };

  return (
    <div className='container App'>
      <form className='row' onSubmit={handleSubmit} style={{ backgroundColor: "#80808040", borderRadius: "10px", padding: "50px" }}>
        <div className='row mb-5'>
          <div className='col-lg-12 fw-bolder text-center'>
            <h2>Candidate Document Submission</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 fw-bold mb-3'>
            <label className="form-label"> First Name<span className='text-danger mt-1'>*</span></label>
            <input
              className="form-control" type="text" name="firstName" placeholder='Enter your first name here..'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='col-lg-6 fw-bold mb-3'>
            <label className="form-label"> Last Name<span className='text-danger mt-1'>*</span></label>
            <input
              className="form-control" type="text" placeholder='Enter your last name here..'
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6 fw-bold mb-3'>
            <label className="form-label">E-mail<span className='text-danger mt-1'>*</span></label>
            <input
              className="form-control" type="email" placeholder='ex: myname@example.com'
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='col-lg-6 fw-bold mb-3'>
            <label className="form-label">Date of Birth<span className='text-danger mt-1'>*</span></label>
            <input
              className="form-control" type="date" name="dateOfBirth" placeholder='Date of Birth'
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='row'>
            <div className='col-lg-12 fw-bold mb-2'>
              Residential Address
            </div>
          </div>
          <div className='col-lg-6 mb-3'>
            <label className="form-label">Street 1<span className='text-danger mt-1'>*</span></label>
            <input
              className="form-control"
              type="text"
              name="street1"
              value={residentialAddress.street1}
              onChange={(e) => setResidentialAddress({ ...residentialAddress, street1: e.target.value })}
              required
            />
          </div>
          <div className='col-lg-6 mb-3'>
            <label className="form-label">Street 2<span className='text-danger mt-1'>*</span></label>
            <input
              className="form-control"
              type="text"
              name="street2"
              value={residentialAddress.street2}
              onChange={(e) => setResidentialAddress({ ...residentialAddress, street2: e.target.value })}
              required
            />
          </div>
        </div>
        <div className='row mb-2'>
          <div className='col-lg-12 fw-bold'>
            <input
              type="checkbox"
              name="sameAsResidential"
              checked={formData.sameAsResidential}
              onChange={handleCheckboxChange}
            />
            <label className="form-label ms-2"> Same as Residential Address</label>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='row'>
            <div className='col-lg-12 fw-bold mb-2'>
              Parmanent Address
            </div>
          </div>
          <div className='col-lg-6 mb-3'>
            <label className="form-label">Street 1</label>
            <input
              className="form-control"
              type="text"
              name="street1"
              value={permanentAddress.street1}
              onChange={(e) => setPermanentAddress({ ...permanentAddress, street1: e.target.value })}
              required
            />
          </div>
          <div className='col-lg-6 mb-3'>
            <label className="form-label">Street 2</label>
            <input
              className="form-control"
              type="text"
              name=".street2"
              value={permanentAddress.street2}
              onChange={(e) => setPermanentAddress({ ...permanentAddress, street2: e.target.value })}
            />
          </div>
        </div>
        <div className='row mb-4'>
          <div className='row'>
            <div className='col-lg-12 fw-bold mb-2'>
              Upload Documents
            </div>
          </div>
          {inputFile.map((val, index) => (
            <>
              <div className='col-lg-3'>
                <label className="form-label">File Name<span className='text-danger mt-1'>*</span></label>
                <input
                  className="form-control" type="text" name="file_name"
                  // value={inputFile.file_name}
                  onChange={inputFileChange}
                  required
                />
              </div>
              <div className='col-lg-3'>
                <label className="form-label">File type<span className='text-danger mt-1'>*</span></label>
                <select className="form-select" aria-label="Default select example" name="file_type" onChange={handleFileTypeChange} required>
                  <option selected disabled>Select</option>
                  <option value="pdf">Pdf</option>
                  <option value="image">Image</option>
                </select>
              </div>
              <div className='col-lg-4'>
                <label className="form-label">Upload document<span className='text-danger mt-1'>*</span></label>
                <input
                  className="form-control" type="file" name="file"
                  // value={File}
                  onChange={handleFileUpload}
                  required
                />
              </div>
              <div className='col-lg-2'>
                <i className="fa-solid fa-square-plus" onClick={handleAddField} style={{ marginTop: "35px", fontSize: "30px", cursor: "pointer" }}></i>
                {inputFile.length > 1 && (
                  <i className="fa-solid fa-trash ms-3" onClick={() => handleRemoveField(index + 1)} style={{ marginTop: "29px", fontSize: "27px", cursor: "pointer" }}></i>
                )}
              </div>
            </>
          ))

          }
        </div>
        <div className='row'>
          <div className='col-lg-12 d-flex justify-content-center'>
            <button className="btn btn-dark" type='submit'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
