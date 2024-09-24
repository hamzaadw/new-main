import React from 'react';
export default function Input({title, type , place, value,onChange}) {
  return (
    <>
      <div className="form-group mt-4">
                <label htmlFor="exampleInputEmail1">{title}</label>
                <input required
                  type={type}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder={place}
                  value={value} 
                  onChange={onChange} 
                />
                
              </div>

            

    </>

  );
}