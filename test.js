const object1 = {
    a: 'somestring',
    b: 42,
    c: false
  };
  
  console.log(Object.values(object1));
  // expected output: Array ["somestring", 42, false]
  ///////////////////////////////////////////////////////////////////////////////////////
  const param  =[
        {a:'aa',b:10,rowType:'addRow',idx:0},
        {a:'bb',b:20,rowType:'addRow',idx:1},
        {a:'cc',b:30,rowType:'addRow',idx:2},
        {a:'dd',b:40,rowType:'getRow',idx:3},
    ];
  const paramreverse = [...param].reverse(); //param배열을 뒤집기
  const rowData=[
        {a:'aa',b:10,rowType:'addRow',idx:0},
        {a:'bb',b:20,rowType:'addRow',idx:1},
        {a:'cc',b:30,rowType:'addRow',idx:2},
        {a:'dd',b:40,rowType:'getRow',idx:3},
        {a:'ee',b:50,rowType:'getRow',idx:4},
    ];
  const rowDataCopy = rowData.map(row=>row);
  
  let newParam = [];
  paramreverse.forEach( (row, idxParam) =>{
    if(row.rowType === 'addRow'){
        rowDataCopy.splice(row.idx,1);
    }else{
        newParam.push(row);
    }
  });
  
  console.log("원데이터");
  console.log(rowData);
  console.log("정리된데이터");
  console.log(rowDataCopy);
  console.log("Param데이터");
  console.log(newParam);
  
  ///////////////////////////////////////////////////////////////////////////////////////
//   const rowData=[{a:'aa',b:10,rowType:'addRow'},{a:'bb',b:20,rowType:'addRow'},{a:'cc',b:30,rowType:'addRow'}];
//   const addRow = rowData.find( (element)=>element.rowType === 'addRow'  );
//   console.log("addRow",addRow);
//   const addRowIndex = rowData.indexOf(addRow);
//   console.log("addRowIndex",addRowIndex);
//   rowData.splice(addRowIndex,1);
//   console.log(rowData);
  ///////////////////////////////////////////////////////////////////////////////////////


  //const a = tt.map(row=> row.b > 10 ?row:null);
  //console.log(a);