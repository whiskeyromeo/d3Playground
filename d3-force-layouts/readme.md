
## Construct a new force layout

```javascript

var force = d3.layout.force() // constructs new force layout
	.nodes(nodes) //sets nodes for layout
	.links(links) //sets links for associated array
	.size([w,h]) // sets available layout size
	.linkStrength(0.1) //rigidity of links
	.linkDistance(20) //target distance between nodes
	.charge(-30) //sets the charge strength - how much energy used to pull apart
	.gravity(0.1) //sets gravitational strength
	.start() //starts the simulation

```

## Node Data Structure


```javascript

var nodes = [ //Want a flat structure such as the one below
	{name: 'Alice'},
	{name: 'Mad Hatter'},
	{name: 'Caterpillar'},
]

```


## Helpful Links
[Intro to Network Analysis and Representation - Stanford](http://dhs.stanford.edu/dh/networks/)
