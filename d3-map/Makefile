build/cb_2015_us_county_20m.zip:
	mkdir -p ${dir $@}
	curl -o $@ http://www2.census.gov/geo/tiger/GENZ2015/shp/cb_2015_us_county_20m.zip

#run us.json and all dependencies
all:
	us.json 

#rebuild from scratch
clean: 
	rm -rf -- us.json build

.PHONY: all clean #defines recipe names to be executed

#unzip the file
build/gz_2010_us_050_00_20m.shp: build/gz_2010_us_050_00_20m.zip
	unzip -od $(dir $@) $<
	touch $@

#download the shapefile
build/gz_2010_us_050_00_20m.zip:
	mkdir -p $(dir $@)
	curl -o $@ http://www2.census.gov/geo/tiger/GENZ2010/$(notdir $@)

# newline characters tell the program that the commands are still ongoing
build/counties.json: build/gz_2010_us_050_00_20m.shp profit-by-county.csv
	node_modules/.bin/topojson \
		-o $@ \
		--id-property='STATE+COUNTY,id' \
		--external-properties='profit-by-county.csv' \
		--properties='profit=+profit,name=label,recno=id,orders=+orders' \
		--projection='width = 960, height = 600, d3.geo.albersUsa() \
		.scale(1280) \
		.translate([width / 2, height / 2])' \
		--simplify=.5  \
		-- counties=$<

# 
build/states.json: build/counties.json
	node_modules/.bin/topojson-merge \
		-o $@ \
		--in-object=counties \
		--out-object=states \
		--key='d.id.substring(0,2)' \
		-- $< 

# #@ <-- targets the file to make, in this case us.json
# $< <-- targets the prerequisite file, here build/states.json
us.json: build/states.json
	node_modules/.bin/topojson-merge \
		-o $@ \
		--in-object=states \
		--out-object=nation \
		-- $<


