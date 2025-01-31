var DEFAULT = "Blass";
var PRESETS = [
["Cichoń", `invariants:
- add(N)
- cov(N)
- add(M)
- b
- non(M)
- cov(M)
- d
- cof(M)
- non(N)
- cof(N)

theorems:
- add(N)<=cov(N)
- non(N)<=cof(N)
- add(N)<=add(M)
- cof(M)<=cof(N)
- add(M)<=b
- d<=cof(M)
- b<=non(M)
- cov(M)<=d
- add(M)<=cov(M)
- non(M)<=cof(M)
- b<=d
- cov(M)<=non(N)
- cov(N)<=non(M)

consistency:
- non(N)<non(M) ; PTfg
- cov(N)<non(M) ; PTfg
- d<non(M) ; PTfg
- d<non(N); Sgg*
- non(N)<cov(N) ; random
- d<cov(N) ; random
- non(M)<cov(M) ; Cohen
- cov(N)<b ; Laver
- cov(M)<b ; Laver
- non(N)<b ; Laver
- cof(M)<non(N) ; dual Hechler
- cov(N)<add(M) ; Hechler`],
["Blass", `invariants:
- p
- h
- b
- g
- e
- s
- a
- r
- d
- u
- i

theorems:
- p<=h
- p<=e
- h<=b
- h<=g
- h<=s
- b<=a
- b<=r
- e<=r
- b<=d
- e<=d
- g<=d
- s<=d
- r<=u
- r<=i
- d<=i

models:
- Cohen;b,a,g,s;d,r
- random;d;r
- Mathias;e;h
- Laver;e,s;b,g
- prediction;p;e
`]
];