var gaugeWidget = angular.module('gaugeWidget', []);

gaugeWidget.directive("gauge", function() {
	return {
		scope : {
			//consists of properties or object passed through the 'slot' into the 'sealed box'
			specs:'='
		},
		templateUrl: 'gaugeTemplate.html',
		link: function(scope, element, attr) {

			for(let value=0, offset = 0;
				 value < scope.specs.maxValue;
				 value += scope.specs.gradientInterval, offset += 100/(180/scope.specs.gradientInterval)
			) {
				scope.specs.gradients.push({value: value, offset: offset});
			}


			var getCoordinatesForAngle = function(centerX, centerY, radius, angleInDegrees) {
				var angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;
				
				return {
					//transform the absolute position created into relative position coordinates
					x: parseInt(centerX + (radius * Math.cos(angleInRadians))),
					y: parseInt(centerY + (radius * Math.sin(angleInRadians)))
				}

			}

			var getArcPathForAngle = function(startingAngle, endingAngle, radius) {
				//Create the starting coordinates for the arc
				var startingPt = getCoordinatesForAngle(scope.specs.centerX,scope.specs.centerY,radius,startingAngle);
				//Create the ending coordinates for the arc
				var endingPt = getCoordinatesForAngle(scope.specs.centerX,scope.specs.centerY,radius,endingAngle);

				var value = ["M", startingPt.x, startingPt.y, "A", radius, radius, 0, 0, 1, endingPt.x, endingPt.y].join(" ");

				return value;
			}

			var displayGauge = function() {
				scope.startValue = getArcPathForAngle(0, scope.specs.currentValue, scope.specs.radius);
				scope.background = getArcPathForAngle(0,180,scope.specs.radius);

				scope.gradients = getArcPathForAngle(0,180,(scope.specs.radius + 10));


				scope.maxValueCoordinates = getCoordinatesForAngle(scope.specs.centerX,scope.specs.centerY, (scope.specs.radius + 10),180);

				var id = scope.specs.id || 'dash';
				scope.dashArray = 'animation: '+ id +' .5s linear; animation-fill-mode: forwards;';

				var arcLength = Math.floor(scope.specs.currentValue * (Math.PI/180) * scope.specs.radius);
				var animationDefinition = '@keyframes '+ id +' { from {stroke-dasharray: 0 ' + arcLength +'; } to {stroke-dasharray: '+ arcLength +' 0;}}';
				document.styleSheets[0].insertRule(animationDefinition,0);

			};
			displayGauge();

		}
	}
});