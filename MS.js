      //Initialization matrix
        function init_grid()
        {
            let gridHtml='';
            for (let i=0; i<row; i++)
            {
                gridHtml += '<tr>'
                    for (let j=0; j<col; j++)
                    {
                        gridHtml +=
                        '<td><span class = "blocks" onmousedown="block_click('+ i + ',' + j + ' , event)"></span></td>';
                    }
                gridHtml += '<tr>'
            }
            document.getElementById('grid').innerHTML = gridHtml;

            let blocks = document.getElementsByClassName('blocks');
            let grid = new Array();
            for (let i=0; i<blocks.length; i++)
            {
                if (i%col ===0)
                {
                    grid.push(new Array());
                }
                blocks[i].count = 0;
                grid[parseInt(i/col)].push(blocks[i]);
            }
            return grid;
        }
    
        
        //Grid click event
        function block_click(_i, _j, e)
        {
            
            

          if(grid[_i][_j].isOpen)
            {
                
                
                return;
            }
            if(e.button === 0)
            {
                
                
                if(isFirstOpen)
                {
                    
                    isFirstOpen=false;
                    let count = 0;
                    
                    //Generate mines
                    while (count < maxCount)
                    {
                        
                        let ri = Math.floor(Math.random() * row);
                        let rj = Math.floor(Math.random() * col);
                        if(!(ri===_i && rj===_j) && !grid[ri][rj].isMine)
                        {
                            grid[ri][rj].isMine = true;
                            count++;
                            for(let i=ri-1;i<ri+2;i++)
                            {
                                for(let j=rj-1;j<rj+2;j++)
                                {
                                    if(i>-1 && j>-1 && i<row &&j<col)
                                    {
                                        grid[i][j].count++;
                                    }
                                }
                            }
                        }
                    }
                }  
                    block_open(_i,_j);
                
            }
                else if(e.button ===2) //right mouse button to mark the square
                {
                    let block=grid[_i][_j];
                    if(block.innerHTML !=='*')
                    {
                        block.innerHTML='*';
                    }
                    else
                    {
                        block.innerHTML='';
                    }
                }
                let isWin=true;
                count.innerHTML=maxCount;
                
                for(let i=0; i<row; i++)
                {
                    for(let j=0; j<col; j++)
                    {
                        let block=grid[i][j];
                        if(block.innerHTML === "*")
                        {
                            count.innerHTML = parseInt(count.innerHTML)-1;
                        }
                        if (!block.isMine && !block.isOpen)
                        {
                            isWin = false;
                        }
                    }
                }
                if(isWin)
                {
                clearInterval(timer);
                swal("YOU WIN");
                }
        }

        //open grid function
        function block_open(_i,_j)
        {
            let block = grid[_i][_j];
            op(block);
            //set the state and style of the open grid
            function op(block)
            {
                block.isOpen = true;
                block.style.background = '#ccc';
                block.style.cursor ='default';
                count.innerHTML=maxCount;
            }
            
            if(block.isMine)
            {
                block.innerHTML = 'Mine';
                for (let i=0;i<row;i++)
                {
                    for (let j=0;j<col;j++)
                    {
                        block = grid[i][j];
                        if(!block.isOpen && block.isMine)
                        {
                            op(block);
                            block.innerHTML='Mine';
                        }
                    }
                }
                clearInterval(timer);
                swal("Game Over");
            }
            else if(block.count ===0)
            {
                for(let i=_i-1;i<_i+2;i++)
                {
                    for(let j=_j-1;j<_j+2;j++)
                    {
                        if(i>-1 && j>-1 && i<row && j<col && !grid[i][j].isOpen && !grid[i][j].ismine)
                        {
                            block_open(i,j);
                        }
                    }
                }
            }
            else 
            {
                block.innerHTML=block.count;
            }
        }