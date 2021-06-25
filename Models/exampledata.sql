TRUNCATE TABLE "Legos", "BuildLists", "WishLists" RESTART IDENTITY;
INSERT INTO "BuildLists" ("Rating", "Comment", "Theme") VALUES (3, '', 'Technic');
INSERT INTO "BuildLists" ("Rating", "Comment", "Theme") VALUES (2, 'Bad','Creator');

INSERT INTO "WishLists" ("Theme") VALUES ('Technic');
INSERT INTO "WishLists" ("Theme") VALUES ('Creator');

INSERT INTO "Legos" ("Name", "Theme", "PieceCount", "SerialNumber",  "InProgress", "Price", "Comment", "Rating", "FinishedLego", "BuildListId", "WishListId") VALUES ('Bugatti Chiron', 'Technic', '3,599', '42083', 'true', '$199', 'Super', 5, 'false', 1, 1 );
INSERT INTO "Legos" ("Name", "Theme", "PieceCount", "SerialNumber",  "InProgress", "Price", "Comment", "Rating", "FinishedLego", "BuildListId", "WishListId") VALUES ('Doms Dodge Charger', 'Technic', '1,077', '42111', 'false', '$197', 'Good', 3, 'false', 1, 1 );
INSERT INTO "Legos" ("Name", "Theme", "PieceCount", "SerialNumber",  "InProgress", "Price", "Comment", "Rating", "FinishedLego", "BuildListId", "WishListId") VALUES ('Land Rover Defender', 'Creator', '2,573', '42110', 'false', '$178', 'Ok', 2, 'false', 2, 2 );
INSERT INTO "Legos" ("Name", "Theme", "PieceCount", "SerialNumber",  "InProgress", "Price", "Comment", "Rating", "FinishedLego", "BuildListId", "WishListId") VALUES ('Porsche 911 RSR', 'Creator', '1,580', '42096', 'false', '$113', 'Fun', 1, 'false', 2, 2 );


