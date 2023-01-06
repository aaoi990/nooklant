CREATE TABLE nooks (
  id INT,
  guid CHAR(36) NOT NULL PRIMARY KEY,
  active BOOLEAN,
  ipAddrExt CHAR(35),
  ipAddrInt CHAR(35),
  username CHAR(35),
  hostname CHAR(35),
  os CHAR(100),
  osBuild CHAR(100),
  osVersion CHAR(100),
  pid INT,
  sleepTimeSeconds INT,
  killTimeHours INT,
  firstCheckIn INT,
  lastCheckIn INT,
  task TEXT,
  hostingFile CHAR(100),
  cryptKey TEXT
);

INSERT INTO nooks VALUES ('1', '783c8e65-6d68-4e03-932a-77cdcc771688', TRUE, '109.212.34.1', '127.0.0.1', 'Dave', 'PERFIDY786', 'Win10', '19045.2343', '22h2', 1093, 3000, 12, 1672844124, 167283411, 'HB', 'none', 'samplekey=');
INSERT INTO nooks VALUES ('2', '3dab1394-762b-4dda-a0e0-8109b8919721', FALSE, '212.12.72.1', '127.0.0.1', 'admin-1', 'winhost', 'Win10', '19045.2343', '22h2', 1093, 3000, 12, 1672844124, 167283411, 'HB', 'none', 'samplekey=');



