
import writeXlsxFile from 'write-excel-file'

    newLibTest(){
        const data = [
            [
                {span: 5, rowSpan:2, value:'span테스트'},
            ],
            [
              { value: 'Name',fontWeight: 'bold',width:200},
              {value: 'Date of Birth',fontWeight: 'bold'},
              {value: 'Cost',fontWeight: 'bold'},
              { value: 'Paid', fontWeight: 'bold'},
              { value: '상세', fontWeight: 'bold'}
            ],
            [
              {type: String,value: 'John Smith'},
              { type: Date, value: new Date(), format: 'mm/dd/yyyy'},
              { type: Number,value: 1800},
              {type: Boolean,value: true},
              {type: String,value: "안녕하세요\nabcd\nefg",wrap: true, color:'#FF0000'}
            ],
            [
              { type: String, value: 'Alice Brown', rowSpan:2, span:1},
              {type: Date,value: new Date(),format: 'mm/dd/yyyy'},
              {type: Number,value: 2600},
              {type: Boolean,value: false},
              {type: String,value: "11111\n2222\n3333",wrap: true}
            ],
            [
              { type: String, value: 'Alice Brown'},
              {type: Date,value: new Date(),format: 'mm/dd/yyyy'},
              {type: Number,value: 3600},
              {type: Boolean,value: false},
              {type: String,value: "555\n666\n3333",wrap: true}
            ]
          ];
          
        const title = [
          { value: 'Name',fontWeight: 'bold'},
          {value: 'Date of Birth',fontWeight: 'bold'},
          {value: 'Cost',fontWeight: 'bold'},
          { value: 'Paid', fontWeight: 'bold'},
          { value: 'IDX', fontWeight: 'bold'},
        ];
        //console.log(this.gridApi.columnModel);

        const newTitle    = [];// 제목
        const newColumn   = [];        
        const columnWidth = [];// width는 옵션으로
        const data11 = this.gridApi.columnModel.columnDefs.map( (colunm, idx) =>{
            newTitle.push({ 
                value: colunm.headerName, 
                fontWeight: 'bold', 
            });
            newColumn.push({
                field: colunm.field, 
                width: colunm.width,
            });
            columnWidth.push({
                width: colunm.width/5,
            });
            //console.log(newColumn);
        });
        console.log("컬럼정보===",columnWidth);

        const excelData = [];
        excelData.push(newTitle);
        this.gridApi.forEachNode( (rowNode, idx) =>{
            const newRow = newColumn.map( (colDef,seq) => {
                let colObj = {
                    type : seq===0? String : Number,
                    value : rowNode.data[colDef.field],  
                    //width : colDef.width,
                    wrap: true, 
                    align: 'center',
                    alignVertical: 'center',
                    borderStyle: 'thin',//'thick',
                };  
                let colObjNew ={};
                if(idx%2=== 1 && seq===0 ){ //첫번째컬럼이면서, row가 두번째마다 RowSpan하기!!!
                    colObj = {
                        ...colObj,
                        span : 1,
                        rowSpan : 2,
                    };
                }
                return colObj;           
            });
            excelData.push(newRow);            
        });
        console.log("엑셀만들데이터===",excelData);
        const columns = [
            {width: 10 },
            {width: 20 },
            { width: 100 }, // in characters
            {}
          ];
          console.log(columns, columnWidth);
        writeXlsxFile(excelData, {
            columns, // optional
            fileName: 'file.xlsx'
          })
          
          // When passing `objects` and `schema`.
        //   await writeXlsxFile(objects, {
        //     schema,
        //     fileName: 'file.xlsx'
        //   })
    }

    newLibTest22(){
        const objects = [
            // Object #1
            {
              name: 'John Smith',
              dateOfBirth: new Date(),
              cost: 1800,
              paid: true,
              detail:  "안녕하세요\nabcd\nefg",
            },
            // Object #2
            {
              name: 'Alice Brown',
              dateOfBirth: new Date(),
              cost: 2600,
              paid: false,
              detail:  "11111\n2222\n3333",
              span:1,
              rowSpan:2,
            },
            {
              name: 'Alice Brown',
              dateOfBirth: new Date(),
              cost: 3600,
              paid: false,
              detail:  "4444\n555\n666",
            }
          ];
          const schema = [
            {
              column: 'Name',
              type: String,
              value: student => student.name,
              span: student => student.span ? student.span : 0,
              rowSpan: student => student.rowSpan ? student.rowSpan : 0,
            },
            {
              column: 'Date of Birth',
              type: Date,
              format: 'mm/dd/yyyy',
              value: student => student.dateOfBirth
            },
            {
              column: 'Cost',
              type: Number,
              format: '#,##0.00',
              value: student => student.cost
            },
            {
              column: 'Paid',
              type: Boolean,
              value: student => student.paid
            },
            {
              column: '상세내용',
              type: String,
              value: student => student.detail,
              wrap: true, 
              width: 120,
              color:'#FF0000',
            }
          ];
          // When passing `objects` and `schema`.
          writeXlsxFile(objects, {
            schema,
            fileName: 'file.xlsx'
          })
    }
	
	
	
                    <button onClick={() => {
                                this.newLibTest22();
                            }} className="btn btn-primary">write-excel-filee-object</button>