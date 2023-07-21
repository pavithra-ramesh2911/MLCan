import React, { useEffect, useRef, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import './containerForm.scss';
import ContainerMetaService from "../../../../services/ContainerService/meta.service";

const { Option } = Select;

const ContainerEditForm = () => {
  
  const [containerNumber, setContainerNumber] = useState("");
  const [containerOwnerName, setcontainerOwnerName] = useState("");
  const [submitterInitial, setsubmitterInitial] = useState("");
  const [location, setLocation] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [lengthOptions, setLengthOptions] = useState<string[]>([]); 
  const [yardOptions, setYardOptions] = useState<string[]>([]); 
const [heightOptions, setHeightOptions] = useState<string[]>([]); 
const [typeOptions, setTypeOptions] = useState<string[]>([]); 
const [error, setError] = useState<Error | undefined>(undefined);


const { fetchYardData, fetchLengthData, fetchHeightData, fetchTypeData } = ContainerMetaService();

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const yardData = await fetchYardData();
      const lengthData = await fetchLengthData();
      const heightData = await fetchHeightData();
      const typeData = await fetchTypeData();

      setYardOptions(yardData);
      setLengthOptions(lengthData);
      setHeightOptions(heightData);
      setTypeOptions(typeData);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  const onFinish = (values: any) => {
    const formData = { ...values, number: containerNumber ,
      containerOwnerName: containerOwnerName,
      submitterInitial: submitterInitial,
      location: location,
      comment: comment
      
    };
    console.log("Form submitted:", formData);
  };




const handleYardValueChange = (value: string) => {
  form.setFieldsValue({ yardName: value }); 
};

const handleCustomerValueChange = (value: string) => {
  form.setFieldsValue({ customer: value }); 
};



const handleLengthValueChange = (value: string) => {
  form.setFieldsValue({ container_length: value }); 
};



const handleHeightValueChange = (value: string) => {
  form.setFieldsValue({ container_height: value }); 
};



const handleTypeValueChange = (value: string) => {
  form.setFieldsValue({ container_type: value }); 
};

  return (
    <div className="Form-body">
    <Form form={form} onFinish={onFinish} validateTrigger="onSubmit">
    
    <Form.Item name="yardName" rules={[{ required: true, message: 'Yard Name is required' }]}>
          <label>Yard Name</label>
          <Select placeholder="Select" onChange={handleYardValueChange}>
          {yardOptions.map((yard) => (
      <Option value={yard} key={yard}>
        {yard}
      </Option>
    ))}
          </Select>
        </Form.Item>

      
      <Form.Item name="number" 
  validateTrigger="onChange">
      <label>Container number</label>
        <Input 
        name="number"
        placeholder="Enter"
        type ="text" 
        
        onChange={(e) => {
          setContainerNumber(e.target.value);
        }}/>
      </Form.Item>


      <Form.Item name="customer" rules={[{ required: true, message: 'Customer Name is required' }]}>

      <label>Customer</label>
        <Select placeholder="Select" onChange={handleCustomerValueChange}>
          <Option value="option1">Option 1</Option>
          <Option value="option2">Option 2</Option>
          <Option value="option3">Option 3</Option>
        </Select>
      </Form.Item>


      <Form.Item name="containerOwnerName">
      <label>Container Owner name</label>
        <Input placeholder="Enter" 
        onChange={(e) => setcontainerOwnerName(e.target.value)}/>
      </Form.Item>

      <Form.Item name="submitterInitial">
      <label>Submitter Initials</label>
        <Input placeholder="Enter"
        onChange={(e) => setsubmitterInitial(e.target.value)}/>
      </Form.Item>

      <Form.Item name="container_length"  
     rules={[{ required: true, message: 'Container Length is required' }]}>
      <label>Container Length</label>
        <Select placeholder="Select" onChange={handleLengthValueChange}>
        {lengthOptions.map((length) => (
                  <Option value={length} key={length}>
                    {length}
                  </Option>
                ))}
        </Select>
      </Form.Item>

      <Form.Item name="container_height"  
      rules={[{ required: true, message: 'Container Height is required' }]}>
      <label>Container Height</label>
        <Select placeholder="Select" onChange={handleHeightValueChange}>
        {heightOptions.map((height) => (
                  <Option value={height} key={height}>
                    {height}
                  </Option>
                ))}
        </Select>
      </Form.Item>

      <Form.Item name="container_type"  
      rules={[{ required: true, message: 'Container Type is required' }]}>
      <label>Container Type</label>
        <Select placeholder="Select" onChange={handleTypeValueChange}>
        {typeOptions.map((type) => (
                  <Option value={type} key={type}>
                    {type}
                  </Option>
                ))}
        </Select>
      </Form.Item>

     

      <Form.Item name="location">
<label>Location</label>
        <Input placeholder="Enter" 
        onChange={(e) => setLocation(e.target.value)}/>
        
      </Form.Item>

      <Form.Item name="comment" className="custom-comments-input" >
      <label>Comments</label>
        <Input.TextArea
          placeholder="Enter"
          autoSize={{ minRows: 3, maxRows: 10}}
          className="custom-textarea"
        onChange={(e) => setComment(e.target.value)}/>
    
        </Form.Item>

        <Form.Item>
        <button type="submit">Update Container</button>
      </Form.Item>

    </Form>

    
    </div>
  );
};

export default ContainerEditForm;


