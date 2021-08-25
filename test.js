////////////////////////////////
컬럼싸이즈 지정
var colSpan = function (params) {
  return params.data === 2 ? 3 : 1;
};

var columnDefs = [
  {
    headerName: 'A',
    field: 'author',
    width: 300,
    colSpan: colSpan,
  },
  {
    headerName: 'Flexed Columns',
    children: [
      {
        headerName: 'B',
        minWidth: 200,
        maxWidth: 350,
        flex: 2,
      },
      {
        headerName: 'C',
        flex: 1,
      },
    ],
  },
];

function fillAllCellsWithWidthMeasurement() {
  Array.prototype.slice
    .call(document.querySelectorAll('.ag-cell'))
    .forEach(function (cell) {
      var width = cell.offsetWidth;
      var isFullWidthRow = cell.parentElement.childNodes.length === 1;
      cell.textContent = (isFullWidthRow ? 'Total width: ' : '') + width + 'px';
    });
}

var gridOptions = {
  defaultColDef: {
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: [1, 2],
  onGridReady: function () {
    setInterval(fillAllCellsWithWidthMeasurement, 50);
  },
};


///////////////////////////
헤더그룹 클래스지정
columnDefs: [
    // the CSS class name supplied to 'headerClass' will get applied to the header group
    { headerName: 'Athlete Details', headerClass: 'my-css-class', children: []}
],


////////////////////////
컬럼명가져오기
function onPrintColumns() {
  var cols = gridOptions.columnApi.getAllGridColumns();
  var colToNameFunc = function (col, index) {
    return index + ' = ' + col.getId();
  };
  var colNames = cols.map(colToNameFunc).join(', ');
  console.log('columns are: ' + colNames);
}


///////////////////////////////////
팝업으로 시설번호, 즉key값 변경할때.. 중복 체크
const rowData=[
        {a:'aa',b:10,rowType:'addRow',idx:0},
        {a:'bb',b:20,rowType:'addRow',idx:1},
        {a:'cc',b:30,rowType:'addRow',idx:2},
        {a:'dd',b:40,rowType:'getRow',idx:3},
        {a:'ee',b:50,rowType:'getRow',idx:4},
    ];
    //값이 변경될때..새로select 해올때... state에 key배열저장해놓기!!! arrKeys가 state값이 됨.
    let arrKeys = [];
    rowData.forEach( (row, idxRow) => {
        const {a,b,rowType} = row ;
        arrKeys.push(`${a}${b}${rowType}`);
    });
    console.table(arrKeys);
    //pop에서 값 받을때.. 체크해보기
    if( arrKeys.indexOf('aa10addRow3') !== -1 )
        console.log("key값 중복입니다.");
    else
        console.log("정상이라 처리가능합니다..");

  // expected output: Array ["somestring", 42, false]
  ///////////////////////////////////////////////////////////////////////////////////////
 삭제이벤트시...add 해놓은 데이터를배열에서 삭제하고...실데이터만 api로 넘기기
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