BEGIN TRANSACTION;
CREATE TABLE code_examples (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    lesson_id INTEGER NOT NULL,

    title TEXT,

    code TEXT NOT NULL,

    FOREIGN KEY (lesson_id) REFERENCES lessons(id)

);
CREATE TABLE lessons (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    section_id INTEGER NOT NULL,

    title TEXT NOT NULL,

    content TEXT,

    order_index INTEGER

    

);
INSERT INTO lessons VALUES(1,1,'Overview of Amiga custom chips reference','amigaCustomChips.html',1);
INSERT INTO lessons VALUES(2,1,'List af M68000 commands and addressing','instructions.html',2);
INSERT INTO lessons VALUES(3,1,'What software is needed for the course','resources.html',3);
INSERT INTO lessons VALUES(4,1,'Asmone quick reference','asmoneref.html',4);
INSERT INTO lessons VALUES(5,1,'Addressing modes in m68000','AddressingModes2.html',5);
INSERT INTO lessons VALUES(6,1,'Amiga OCS / ECS ÔÇö Register Map','HardwareRegsBits.html',6);
INSERT INTO lessons VALUES(7,'','','','');
INSERT INTO lessons VALUES(8,'','','','');
INSERT INTO lessons VALUES(9,'','',NULL,NULL);
INSERT INTO lessons VALUES(10,'','',NULL,NULL);
INSERT INTO lessons VALUES(11,'','',NULL,NULL);
INSERT INTO lessons VALUES(12,1,'Let''s start writing some smple code','CodeContainer.html',7);
INSERT INTO lessons VALUES(13,1,'Download Asm-One adf','download',8);
INSERT INTO lessons VALUES(14,1,'Download sources for this part','downloadsource',9);
INSERT INTO lessons VALUES(15,1,'TODO','#',10);
INSERT INTO lessons VALUES(16,2,'The blitter Some Info','BlitterInfo.html',1);
INSERT INTO lessons VALUES(17,2,'Blitter ÔÇö Interactive Visualizer','instructions.html',2);
INSERT INTO lessons VALUES(18,2,'Let''s start coding and using the blitter','CodeContainerBlitter.html',3);
INSERT INTO lessons VALUES(19,2,'Blitting picture instead','CodeContainerPart2.html',4);
INSERT INTO lessons VALUES(20,2,'Now Double Buffering','CodeDoubleBuffering.html',6);
INSERT INTO lessons VALUES(21,2,'Time for using Interrupts','CodeInterrup.html',7);
INSERT INTO lessons VALUES(22,2,'Time for a better shell that uses VBlank interrupt','codeContainerInterrupt.html',8);
INSERT INTO lessons VALUES(23,2,'Scrolling and sinescrolling with the blitter','codeContainerText.html',9);
INSERT INTO lessons VALUES(24,2,'Sinus Bobs','codeContainerBobs.html',10);
INSERT INTO lessons VALUES(25,2,'Computer math plot','containerCodeMAth.html',11);
INSERT INTO lessons VALUES(26,'','',NULL,NULL);
INSERT INTO lessons VALUES(27,2,'Copper plasma','codeContainerPlasma.html',13);
INSERT INTO lessons VALUES(28,2,'Download sources for this part','./ADF/courseScroll.adf',14);
INSERT INTO lessons VALUES(29,3,'Vector Bobs','codeContainerVectorBOBS.html',1);
INSERT INTO lessons VALUES(30,3,'Time for adding demo script handler','codeContainerShell.html',2);
INSERT INTO lessons VALUES(31,3,'Putting it all together -Demo','downloadsource3',3);
INSERT INTO lessons VALUES(32,3,'Video of demo','demo.mp4',4);
INSERT INTO lessons VALUES(33,3,'Drawing lines','codeContainerLine.html',5);
INSERT INTO lessons VALUES(34,3,'Drawing wireframe cube','codeContainerDrawing.html',6);
INSERT INTO lessons VALUES(35,3,'Wireframe cube','codeContainerRotCube.html',7);
INSERT INTO lessons VALUES(36,3,'Hidden line cube','codeContainerHiddenLines.html',8);
INSERT INTO lessons VALUES(37,3,'Filled cube','codeContainerFilledCube.html',9);
INSERT INTO lessons VALUES(38,3,'otating Filled cube lightsource','#',10);
INSERT INTO lessons VALUES(39,3,'Download source files','stars3d.adf',11);
INSERT INTO lessons VALUES(40,3,'Simple projections 3d stars','containerCodeStars.html',0);
CREATE TABLE Users (

		id INTEGER PRIMARY KEY AUTOINCREMENT,

		Name TEXT NOT NULL,

		Email TEXT NOT NULL,

		Password TEXT NOT NULL

	);
INSERT INTO Users VALUES(1,'Sigurjon','   ','test123');

COMMIT;
