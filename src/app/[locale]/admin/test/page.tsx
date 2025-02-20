'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AddDynamicInputFields() {
  const [inputs, setInputs] = useState([{ firstName: '', lastName: '' }]);

  const handleAddInput = () => {
    setInputs([...inputs, { firstName: '', lastName: '' }]);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    let { name, value } = event.target;
    let onChangeValue = [...inputs];

    // Ensure TypeScript recognizes 'name' as a valid key
    if (name in onChangeValue[index]) {
      (onChangeValue[index] as Record<string, string>)[name] = value;
      setInputs(onChangeValue);
    }
  };

  const handleDeleteInput = (index: number) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };

  return (
    <div className="container grid gap-4">
      {inputs.map((item, index) => (
        <div className="input_container grid grid-cols-3 gap-4" key={index}>
          <Input
            name="firstName"
            type="text"
            value={item.firstName}
            onChange={(event) => handleChange(event, index)}
          />
          <Input
            name="lastName"
            type="text"
            value={item.lastName}
            onChange={(event) => handleChange(event, index)}
          />
          <div className="grid grid-cols-2 gap-4">
            {inputs.length > 1 && (
              <Button onClick={() => handleDeleteInput(index)}>Delete</Button>
            )}
            {index === inputs.length - 1 && (
              <Button onClick={() => handleAddInput()}>Add</Button>
            )}
          </div>
        </div>
      ))}

      <div className="body"> {JSON.stringify(inputs)} </div>
    </div>
  );
}
