https://www.ag-grid.com/javascript-data-grid/change-detection/#change-detection-and-sorting-filtering-grouping
	{
      headerName: 'Total',
      type: 'totalColumn',
      // we use getValue() instead of data.a so that it gets the aggregated values at the group level
      valueGetter:
        'getValue("a") + getValue("b") + getValue("c") + getValue("d")',
    },
	
https://www.ag-grid.com/javascript-data-grid/change-cell-renderers/
JavaScript Data Grid: Change Cell Renderers
값변경될때  agAnimateShowChangeCellRenderer:
값변경될때  agAnimateSlideCellRenderer:
두가지예시


suppressChangeDetection=true  
This will stop the change detection process firing when the above events happen

https://www.ag-grid.com/javascript-data-grid/server-side-model-updating/#update--refresh
Row추가삭제

https://www.ag-grid.com/javascript-data-grid/view-refresh/
row칼라 다시설정하기

https://www.ag-grid.com/javascript-data-grid/column-properties/#reference-events
onCellValueChanged

/*
--------------------------
컬럼변경시 배경색 바꾸기
--------------------------
*/
var colorIndex = 0;
var colors = ['#000000', '#000066', '#006600', '#660000'];

var gridOptions = {
  columnDefs: [
    // do NOT hide this column, it's needed for editing
    { field: 'group', rowGroup: true, editable: true },
    { field: 'a', type: 'valueColumn' },
    { field: 'b', type: 'valueColumn' },
    { field: 'c', type: 'valueColumn' },
    { field: 'd', type: 'valueColumn' },
    {
      headerName: 'Total',
      type: 'totalColumn',
      // we use getValue() instead of data.a so that it gets the aggregated values at the group level
      valueGetter:
        'getValue("a") + getValue("b") + getValue("c") + getValue("d")',
    },
  ],
  defaultColDef: {
    flex: 1,
    sortable: true,
    filter: true,
  },
  autoGroupColumnDef: {
    minWidth: 100,
  },
  columnTypes: {
    valueColumn: {
      editable: true,
      aggFunc: 'sum',
      valueParser: 'Number(newValue)',
      cellClass: 'number-cell',
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      filter: 'agNumberColumnFilter',
    },
    totalColumn: {
      cellRenderer: 'agAnimateShowChangeCellRenderer',
      cellClass: 'number-cell',
    },
  },
  rowData: getRowData(),
  groupDefaultExpanded: 1,
  suppressAggFuncInHeader: true,
  animateRows: true,
  onCellValueChanged: onCellValueChanged,
  getRowStyle: function () {
    return {
      backgroundColor: colors[colorIndex],
    };
  },
};

function onCellValueChanged(params) {
  var changedData = [params.data];
  console.log(params);
  params.api.applyTransaction({ update: changedData });

  colorIndex++;
  if (colorIndex === colors.length) {
    colorIndex = 0;
  }
  
  var rows = [];
  var row = gridOptions.api.getDisplayedRowAtIndex(1);
    rows.push(row);
  gridOptions.api.redrawRows({ rowNodes: rows });
}

function getRowData() {
  var rowData = [];
  for (var i = 1; i <= 10; i++) {
    rowData.push({
      group: i < 5 ? 'A' : 'B',
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
    });
  }
  return rowData;
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});
