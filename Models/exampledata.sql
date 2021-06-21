TRUNCATE TABLE "Legos", "BuildLists" RESTART IDENTITY;
INSERT INTO "BuildLists" ("Rating", "Comment") VALUES (5, 'Fun Lego');
INSERT INTO "BuildLists" ("Rating", "Comment") VALUES (5, 'Fun Lego');

INSERT INTO "Legos" ("Name", "Theme", "PieceCount", "SerialNumber", "BuildListId") VALUES ('Bugatti Chiron', 'Technic', '3,599', '42083', 1 );
INSERT INTO "Legos" ("Name", "Theme", "PieceCount", "SerialNumber", "BuildListId") VALUES ('Doms Dodge Charger', 'Technic', '1,077', '42111', 2);
INSERT INTO "Legos" ("Name", "Theme", "PieceCount", "SerialNumber", "BuildListId") VALUES ('Land Rover Defender', 'Technic', '2,573', '42110', 1);
INSERT INTO "Legos" ("Name", "Theme", "PieceCount", "SerialNumber", "BuildListId") VALUES ('Porsche 911 RSR', 'Technic', '1,580', '42096', 2);


