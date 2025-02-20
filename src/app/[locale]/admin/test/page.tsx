'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// type Field = {
//   fieldName: string;
//   jsonKey: string;
//   children?: Field[]; // 🆕 Added nested children support
// };
type Field = {
  fieldName: string;
  jsonKey: string;
  children?: Field[];
} & { [key: string]: string | Field[] | undefined };

export default function AddDynamicInputFields() {
  const [parents, setParents] = useState<Field[]>([
    { fieldName: '', jsonKey: '', children: [] },
  ]);

  // Add new MAIN child
  const handleAddInput = () => {
    setParents([...parents, { fieldName: '', jsonKey: '', children: [] }]);
  };

  // Add INNER child to a specific main child
  const handleAddInnerChild = (parentIndex: number) => {
    let updatedChilds = [...parents];
    updatedChilds[parentIndex].children?.push({
      fieldName: '',
      jsonKey: '',
    });
    setParents([...updatedChilds]);
  };

  // Handle input change (both main & inner child)
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    parentIndex: number,
    childIndex?: number,
  ) => {
    let { name, value } = event.target;
    let updatedChilds = [...parents];

    // if (childIndex !== undefined) {
    //   // Update INNER child
    //   updatedChilds[parentIndex].children![childIndex][name] = value;
    // } else {
    //   // Update MAIN child
    //   updatedChilds[parentIndex][name] = value;
    // }

    if (childIndex !== undefined) {
      // Update INNER child
      updatedChilds[parentIndex].children![childIndex][name as keyof Field] =
        value;
    } else {
      // Update MAIN child
      updatedChilds[parentIndex][name as keyof Field] = value;
    }

    setParents(updatedChilds);
  };

  // Delete MAIN child
  const handleDeleteInput = (index: number) => {
    setParents(parents.filter((_, i) => i !== index));
  };

  // Delete INNER child
  const handleDeleteInnerChild = (parentIndex: number, childIndex: number) => {
    let updatedChilds = [...parents];
    updatedChilds[parentIndex].children = updatedChilds[
      parentIndex
    ].children?.filter((_, i) => i !== childIndex);
    setParents(updatedChilds);
  };

  return (
    <div className="grid gap-4">
      {parents.map((item, index) => (
        <Card key={index}>
          <CardContent className="grid gap-6 p-6">
            <div className=" grid grid-cols-3 gap-4">
              <Input
                name="fieldName"
                type="text"
                value={item.fieldName}
                onChange={(event) => handleChange(event, index)}
              />
              <Input
                name="jsonKey"
                type="text"
                value={item.jsonKey}
                onChange={(event) => handleChange(event, index)}
              />
              <div className="grid grid-cols-2 gap-4">
                {parents.length > 1 && (
                  <Button onClick={() => handleDeleteInput(index)}>
                    Delete
                  </Button>
                )}
                <Button onClick={() => handleAddInnerChild(index)}>
                  + Inner
                </Button>
              </div>
            </div>
            {item.children?.map((child, childIndex) => (
              <div key={childIndex} className="ml-6 border-l border-gray-300">
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    name="fieldName"
                    type="text"
                    value={child.fieldName}
                    onChange={(event) => handleChange(event, index, childIndex)}
                  />
                  <Input
                    name="jsonKey"
                    type="text"
                    value={child.jsonKey}
                    onChange={(event) => handleChange(event, index, childIndex)}
                  />
                  <Button
                    onClick={() => handleDeleteInnerChild(index, childIndex)}
                    className="bg-red-500 text-white"
                  >
                    Delete Inner
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Button onClick={handleAddInput}>+ Add Main</Button>
      <div>
        <pre>{JSON.stringify(parents, null, 2)}</pre>
      </div>
    </div>
  );
}
