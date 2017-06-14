###Description

Based off of Ben Sullins Pluralsight course: Geospatial Mapping with D3

##Setup

From terminal:
```
	npm init
	npm install -S topojson
	brew install gdal
	make #Runs Makefile, downloads relevant dataset from US Census bureau
```


##Converting Shape Files
```
	#ogr2ogr -f <format> <output> <input> 
	$ ogr2ogr
		-f GeoJSON 						//output format
		counties.json 					//output file
		build/cb_2015_us_county_20m.shp //input file
```


##Clipping Shape Files
```
	$ ogr2ogr
		-f GeoJSON 										//output format
		counties-clipped.json 							//output file
		build/cb_2015_us_county_20m.shp 				//input file
		-clipsrc -124.4096 32.5343 -114.1308 42.0095 	//bounding box
```


##Filtering Shape Files
```
# bit.ly/usa-fips for fips codes
	$ ogr2ogr
		-f GeoJSON 										//output format
		counties-filtered.json 							//output file
		build/cb_2015_us_county_20m.shp 				//input file
		-where "STATEFP='06'"							//filtering
```


##Converting GeoJSON to topojson
```	
	# topojson -o <output-file> <input-file>
	$ topojson
		-o topo-counties.json 		//output file
		counties.json 				//input file
```


##Adding a D3 Projection
```
	# --projection project spherical input geometry using a D3 geographic projection
	$ topojson
		-o topo-counties-projected.json 			//output file
		--projection='width = 960, height = 600, d3.geo.albersUsa()
			.scale(1280)
			.translate([width / 2, height / 2])'	// D3 Projection
		counties.json 								//input file
```


##Simplifying Output -- Helps to soften lines/save some space on the ultimate file.
```
	# --simplify precision threshold for Visvalingam simplification
	# example : https://bost.ocks.org/mike/simplify

	$ topojson
		-o topo-counties-simplified.json 			//output file
		--projection='width=960, height=600, d3.geo.albersUsa()
			.scale(1280)
			.translate([width / 2, height / 2])' 	//d3 projection
		--simplify=.5 								//simplify parameter
		counties.json 								//input file
```

##Makefile
	Read it, its the easiest way to figure out what is going on.

	To use (from terminal): 
	```
		make <command>
	```
	
	Clean things up first
	```
		make clean
	```

	In this version, the furthest command along is us.json
	```
		make us.json
	```

	This should run through all of the different commands creating the necessary files along the way. 

	Can work similarly to a gulpfile in terms of automation, except acting on the command line. Awesomeness.


##Sources:

* www.census.gov
* www.naturalearthdata.com
* www.gdal.org
* Bit.ly
	* http://bit.ly/topojson-ref
	* http://bit.ly/census-maps
	* http://bit.ly/natural-earth
	* http://bit.ly/flicker-geo-api
* https://github.com/mbostock/us-atlas
