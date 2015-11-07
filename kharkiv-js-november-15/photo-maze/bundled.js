(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// NameSpace
var EasyStar = EasyStar || {};

// For require.js
if (typeof define === "function" && define.amd) {
	define("easystar", [], function() {
		return EasyStar;
	});
}

// For browserify and node.js
if (typeof module !== 'undefined' && module.exports) {
	module.exports = EasyStar;
}
/**
* A simple Node that represents a single tile on the grid.
* @param {Object} parent The parent node.
* @param {Number} x The x position on the grid.
* @param {Number} y The y position on the grid.
* @param {Number} costSoFar How far this node is in moves*cost from the start.
* @param {Number} simpleDistanceToTarget Manhatten distance to the end point.
**/
EasyStar.Node = function(parent, x, y, costSoFar, simpleDistanceToTarget) {
	this.parent = parent;
	this.x = x;
	this.y = y;
	this.costSoFar = costSoFar;
	this.simpleDistanceToTarget = simpleDistanceToTarget;

	/**
	* @return {Number} Best guess distance of a cost using this node.
	**/
	this.bestGuessDistance = function() {
		return this.costSoFar + this.simpleDistanceToTarget;
	}
};

// Constants
EasyStar.Node.OPEN_LIST = 0;
EasyStar.Node.CLOSED_LIST = 1;
/**
* This is an improved Priority Queue data type implementation that can be used to sort any object type.
* It uses a technique called a binary heap.
* 
* For more on binary heaps see: http://en.wikipedia.org/wiki/Binary_heap
* 
* @param {String} criteria The criteria by which to sort the objects. 
* This should be a property of the objects you're sorting.
* 
* @param {Number} heapType either PriorityQueue.MAX_HEAP or PriorityQueue.MIN_HEAP.
**/
EasyStar.PriorityQueue = function(criteria,heapType) {
	this.length = 0; //The current length of heap.
	var queue = [];
	var isMax = false;

	//Constructor
	if (heapType==EasyStar.PriorityQueue.MAX_HEAP) {
		isMax = true;
	} else if (heapType==EasyStar.PriorityQueue.MIN_HEAP) {
		isMax = false;
	} else {
		throw heapType + " not supported.";
	}

	/**
	* Inserts the value into the heap and sorts it.
	* 
	* @param value The object to insert into the heap.
	**/
	this.insert = function(value) {
		if (!value.hasOwnProperty(criteria)) {
			throw "Cannot insert " + value + " because it does not have a property by the name of " + criteria + ".";
		}
		queue.push(value);
		this.length++;
		bubbleUp(this.length-1);
	}

	/**
	* Peeks at the highest priority element.
	*
	* @return the highest priority element
	**/
	this.getHighestPriorityElement = function() {
		return queue[0];
	}

	/**
	* Removes and returns the highest priority element from the queue.
	*
	* @return the highest priority element
	**/
	this.shiftHighestPriorityElement = function() {
		if (this.length === 0) {
			throw ("There are no more elements in your priority queue.");
		} else if (this.length === 1) {
			var onlyValue = queue[0];
			queue = [];
                        this.length = 0;
			return onlyValue;
		}
		var oldRoot = queue[0];
		var newRoot = queue.pop();
		this.length--;
		queue[0] = newRoot;
		swapUntilQueueIsCorrect(0);
		return oldRoot;
	}

	var bubbleUp = function(index) {
		if (index===0) {
			return;
		}
		var parent = getParentOf(index);
		if (evaluate(index,parent)) {
			swap(index,parent);
			bubbleUp(parent);
		} else {
			return;
		}
	}

	var swapUntilQueueIsCorrect = function(value) {
		var left = getLeftOf(value);
		var right = getRightOf(value);
		if (evaluate(left,value)) {
			swap(value,left);
			swapUntilQueueIsCorrect(left);
		} else if (evaluate(right,value)) {
			swap(value,right);
			swapUntilQueueIsCorrect(right);
		} else if (value==0) {
			return;
		} else {
			swapUntilQueueIsCorrect(0);
		}
	}

	var swap = function(self,target) {
		var placeHolder = queue[self];
		queue[self] = queue[target];
		queue[target] = placeHolder;
	}

	var evaluate = function(self,target) {
		if (queue[target]===undefined||queue[self]===undefined) {
			return false;
		}
		
		var selfValue;
		var targetValue;
		
		// Check if the criteria should be the result of a function call.
		if (typeof queue[self][criteria] === 'function') {
			selfValue = queue[self][criteria]();
			targetValue = queue[target][criteria]();
		} else {
			selfValue = queue[self][criteria];
			targetValue = queue[target][criteria];
		}

		if (isMax) {
			if (selfValue > targetValue) {
				return true;
			} else {
				return false;
			}
		} else {
			if (selfValue < targetValue) {
				return true;
			} else {
				return false;
			}
		}
	}

	var getParentOf = function(index) {
		return Math.floor((index-1) / 2);
	}

	var getLeftOf = function(index) {
		return index*2 + 1;
	}

	var getRightOf = function(index) {
		return index*2 + 2;
	}
};

// Constants
EasyStar.PriorityQueue.MAX_HEAP = 0;
EasyStar.PriorityQueue.MIN_HEAP = 1;

/**
 * Represents a single instance of EasyStar.
 * A path that is in the queue to eventually be found.
 */
EasyStar.instance = function() {
	this.isDoneCalculating = true;
	this.pointsToAvoid = {};
	this.startX;
	this.callback;
	this.startY;
	this.endX;
	this.endY;
	this.nodeHash = {};
	this.openList;
};
/**
*	EasyStar.js
*	github.com/prettymuchbryce/EasyStarJS
*	Licensed under the MIT license.
* 
*	Implementation By Bryce Neal (@prettymuchbryce)
**/
EasyStar.js = function() {
	var STRAIGHT_COST = 1.0;
	var DIAGONAL_COST = 1.4;
	var syncEnabled = false;
	var pointsToAvoid = {};
	var collisionGrid;
	var costMap = {};
	var pointsToCost = {};
	var allowCornerCutting = true;
	var iterationsSoFar;
	var instances = [];
	var iterationsPerCalculation = Number.MAX_VALUE;
	var acceptableTiles;
	var diagonalsEnabled = false;

	/**
	* Sets the collision grid that EasyStar uses.
	* 
	* @param {Array|Number} tiles An array of numbers that represent 
	* which tiles in your grid should be considered
	* acceptable, or "walkable".
	**/
	this.setAcceptableTiles = function(tiles) {
		if (tiles instanceof Array) {
			// Array
			acceptableTiles = tiles;
		} else if (!isNaN(parseFloat(tiles)) && isFinite(tiles)) {
			// Number
			acceptableTiles = [tiles];
		}
	};

	/**
	* Enables sync mode for this EasyStar instance..
	* if you're into that sort of thing.
	**/
	this.enableSync = function() {
		syncEnabled = true;
	};

	/**
	* Disables sync mode for this EasyStar instance.
	**/
	this.disableSync = function() {
		syncEnabled = false;
	};

	/**
	 * Enable diagonal pathfinding.
	 */
	this.enableDiagonals = function() {
		diagonalsEnabled = true;
	}

	/**
	 * Disable diagonal pathfinding.
	 */
	this.disableDiagonals = function() {
		diagonalsEnabled = false;
	}

	/**
	* Sets the collision grid that EasyStar uses.
	* 
	* @param {Array} grid The collision grid that this EasyStar instance will read from. 
	* This should be a 2D Array of Numbers.
	**/
	this.setGrid = function(grid) {
		collisionGrid = grid;

		//Setup cost map
		for (var y = 0; y < collisionGrid.length; y++) {
			for (var x = 0; x < collisionGrid[0].length; x++) {
				if (!costMap[collisionGrid[y][x]]) {
					costMap[collisionGrid[y][x]] = 1
				}
			}
		}
	};

	/**
	* Sets the tile cost for a particular tile type.
	*
	* @param {Number} The tile type to set the cost for.
	* @param {Number} The multiplicative cost associated with the given tile.
	**/
	this.setTileCost = function(tileType, cost) {
		costMap[tileType] = cost;
	};

	/**
	* Sets the an additional cost for a particular point.
	* Overrides the cost from setTileCost.
	*
	* @param {Number} x The x value of the point to cost.
	* @param {Number} y The y value of the point to cost.
	* @param {Number} The multiplicative cost associated with the given point.
	**/
	this.setAdditionalPointCost = function(x, y, cost) {
		pointsToCost[x + '_' + y] = cost;
	};

	/**
	* Remove the additional cost for a particular point.
	*
	* @param {Number} x The x value of the point to stop costing.
	* @param {Number} y The y value of the point to stop costing.
	**/
	this.removeAdditionalPointCost = function(x, y) {
		delete pointsToCost[x + '_' + y];
	}

	/**
	* Remove all additional point costs.
	**/
	this.removeAllAdditionalPointCosts = function() {
		pointsToCost = {};
	}

	/**
	* Sets the number of search iterations per calculation. 
	* A lower number provides a slower result, but more practical if you 
	* have a large tile-map and don't want to block your thread while
	* finding a path.
	* 
	* @param {Number} iterations The number of searches to prefrom per calculate() call.
	**/
	this.setIterationsPerCalculation = function(iterations) {
		iterationsPerCalculation = iterations;
	};
	
	/**
	* Avoid a particular point on the grid, 
	* regardless of whether or not it is an acceptable tile.
	*
	* @param {Number} x The x value of the point to avoid.
	* @param {Number} y The y value of the point to avoid.
	**/
	this.avoidAdditionalPoint = function(x, y) {
		pointsToAvoid[x + "_" + y] = 1;
	};

	/**
	* Stop avoiding a particular point on the grid.
	*
	* @param {Number} x The x value of the point to stop avoiding.
	* @param {Number} y The y value of the point to stop avoiding.
	**/
	this.stopAvoidingAdditionalPoint = function(x, y) {
		delete pointsToAvoid[x + "_" + y];
	};

	/**
	* Enables corner cutting in diagonal movement.
	**/
	this.enableCornerCutting = function() {
		allowCornerCutting = true;
	};

	/**
	* Disables corner cutting in diagonal movement.
	**/
	this.disableCornerCutting = function() {
		allowCornerCutting = false;
	};

	/**
	* Stop avoiding all additional points on the grid.
	**/
	this.stopAvoidingAllAdditionalPoints = function() {
		pointsToAvoid = {};
	};

	/**
	* Find a path.
	* 
	* @param {Number} startX The X position of the starting point.
	* @param {Number} startY The Y position of the starting point.
	* @param {Number} endX The X position of the ending point.
	* @param {Number} endY The Y position of the ending point.
	* @param {Function} callback A function that is called when your path
	* is found, or no path is found.
	* 
	**/
	this.findPath = function(startX, startY, endX, endY, callback) {
		// Wraps the callback for sync vs async logic
		var callbackWrapper = function(result) {
			if (syncEnabled) {
				callback(result);
			} else {
				setTimeout(function() {
					callback(result);
				});
			}
		}

		// No acceptable tiles were set
		if (acceptableTiles === undefined) {
			throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");
		}
		// No grid was set
		if (collisionGrid === undefined) {
			throw new Error("You can't set a path without first calling setGrid() on EasyStar.");
		}

		// Start or endpoint outside of scope.
		if (startX < 0 || startY < 0 || endX < 0 || endX < 0 || 
		startX > collisionGrid[0].length-1 || startY > collisionGrid.length-1 || 
		endX > collisionGrid[0].length-1 || endY > collisionGrid.length-1) {
			throw new Error("Your start or end point is outside the scope of your grid.");
		}

		// Start and end are the same tile.
		if (startX===endX && startY===endY) {
			callbackWrapper([]);
			return;
		}

		// End point is not an acceptable tile.
		var endTile = collisionGrid[endY][endX];
		var isAcceptable = false;
		for (var i = 0; i < acceptableTiles.length; i++) {
			if (endTile === acceptableTiles[i]) {
				isAcceptable = true;
				break;
			}
		}

		if (isAcceptable === false) {
			callbackWrapper(null);
			return;
		}

		// Create the instance
		var instance = new EasyStar.instance();
		instance.openList = new EasyStar.PriorityQueue("bestGuessDistance",EasyStar.PriorityQueue.MIN_HEAP);
		instance.isDoneCalculating = false;
		instance.nodeHash = {};
		instance.startX = startX;
		instance.startY = startY;
		instance.endX = endX;
		instance.endY = endY;
		instance.callback = callbackWrapper;

		instance.openList.insert(coordinateToNode(instance, instance.startX, 
			instance.startY, null, STRAIGHT_COST));

		instances.push(instance);
	};

	/**
	* This method steps through the A* Algorithm in an attempt to
	* find your path(s). It will search 4-8 tiles (depending on diagonals) for every calculation.
	* You can change the number of calculations done in a call by using
	* easystar.setIteratonsPerCalculation().
	**/
	this.calculate = function() {
		if (instances.length === 0 || collisionGrid === undefined || acceptableTiles === undefined) {
			return;
		}
		for (iterationsSoFar = 0; iterationsSoFar < iterationsPerCalculation; iterationsSoFar++) {
			if (instances.length === 0) {
				return;
			}

			if (syncEnabled) {
				// If this is a sync instance, we want to make sure that it calculates synchronously. 
				iterationsSoFar = 0;
			}

			// Couldn't find a path.
			if (instances[0].openList.length === 0) {
				var ic = instances[0];
				ic.callback(null);
				instances.shift();
				continue;
			}

			var searchNode = instances[0].openList.shiftHighestPriorityElement();

			var tilesToSearch = [];
			searchNode.list = EasyStar.Node.CLOSED_LIST;

			if (searchNode.y > 0) {
				tilesToSearch.push({ instance: instances[0], searchNode: searchNode, 
					x: 0, y: -1, cost: STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y-1)});
			}
			if (searchNode.x < collisionGrid[0].length-1) {
				tilesToSearch.push({ instance: instances[0], searchNode: searchNode, 
					x: 1, y: 0, cost: STRAIGHT_COST * getTileCost(searchNode.x+1, searchNode.y)});
			}
			if (searchNode.y < collisionGrid.length-1) {
				tilesToSearch.push({ instance: instances[0], searchNode: searchNode, 
					x: 0, y: 1, cost: STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y+1)});
			}
			if (searchNode.x > 0) {
				tilesToSearch.push({ instance: instances[0], searchNode: searchNode, 
					x: -1, y: 0, cost: STRAIGHT_COST * getTileCost(searchNode.x-1, searchNode.y)});
			}
			if (diagonalsEnabled) {
				if (searchNode.x > 0 && searchNode.y > 0) {

					if (allowCornerCutting ||
						(isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y-1) &&
						isTileWalkable(collisionGrid, acceptableTiles, searchNode.x-1, searchNode.y))) {
						
						tilesToSearch.push({ instance: instances[0], searchNode: searchNode, 
							x: -1, y: -1, cost: DIAGONAL_COST * getTileCost(searchNode.x-1, searchNode.y-1)});
					}
				}
				if (searchNode.x < collisionGrid[0].length-1 && searchNode.y < collisionGrid.length-1) {

					if (allowCornerCutting ||
						(isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y+1) &&
						isTileWalkable(collisionGrid, acceptableTiles, searchNode.x+1, searchNode.y))) {
						
						tilesToSearch.push({ instance: instances[0], searchNode: searchNode, 
							x: 1, y: 1, cost: DIAGONAL_COST * getTileCost(searchNode.x+1, searchNode.y+1)});
					}
				}
				if (searchNode.x < collisionGrid[0].length-1 && searchNode.y > 0) {

					if (allowCornerCutting ||
						(isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y-1) &&
						isTileWalkable(collisionGrid, acceptableTiles, searchNode.x+1, searchNode.y))) {


						tilesToSearch.push({ instance: instances[0], searchNode: searchNode, 
							x: 1, y: -1, cost: DIAGONAL_COST * getTileCost(searchNode.x+1, searchNode.y-1)});
					}
				}
				if (searchNode.x > 0 && searchNode.y < collisionGrid.length-1) {

					if (allowCornerCutting ||
						(isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y+1) &&
						isTileWalkable(collisionGrid, acceptableTiles, searchNode.x-1, searchNode.y))) {


						tilesToSearch.push({ instance: instances[0], searchNode: searchNode, 
							x: -1, y: 1, cost: DIAGONAL_COST * getTileCost(searchNode.x-1, searchNode.y+1)});
					}
				}
			}

			// First sort all of the potential nodes we could search by their cost + heuristic distance.
			tilesToSearch.sort(function(a, b) {
				var aCost = a.cost + getDistance(searchNode.x + a.x, searchNode.y + a.y, instances[0].endX, instances[0].endY)
				var bCost = b.cost + getDistance(searchNode.x + b.x, searchNode.y + b.y, instances[0].endX, instances[0].endY)
				if (aCost < bCost) {
					return -1;
				} else if (aCost === bCost) {
					return 0;
				} else {
					return 1;
				}
			});

			var isDoneCalculating = false;

			// Search all of the surrounding nodes
			for (var i = 0; i < tilesToSearch.length; i++) {
				checkAdjacentNode(tilesToSearch[i].instance, tilesToSearch[i].searchNode, 
					tilesToSearch[i].x, tilesToSearch[i].y, tilesToSearch[i].cost);
				if (tilesToSearch[i].instance.isDoneCalculating === true) {
					isDoneCalculating = true;
					break;
				}
			}

			if (isDoneCalculating) {
				instances.shift();
				continue;
			}

		}
	};

	// Private methods follow
	var checkAdjacentNode = function(instance, searchNode, x, y, cost) {
		var adjacentCoordinateX = searchNode.x+x;
		var adjacentCoordinateY = searchNode.y+y;

		if (pointsToAvoid[adjacentCoordinateX + "_" + adjacentCoordinateY] === undefined) {
			// Handles the case where we have found the destination
			if (instance.endX === adjacentCoordinateX && instance.endY === adjacentCoordinateY) {
				instance.isDoneCalculating = true;
				var path = [];
				var pathLen = 0;
				path[pathLen] = {x: adjacentCoordinateX, y: adjacentCoordinateY};
				pathLen++;
				path[pathLen] = {x: searchNode.x, y:searchNode.y};
				pathLen++;
				var parent = searchNode.parent;
				while (parent!=null) {
					path[pathLen] = {x: parent.x, y:parent.y};
					pathLen++;
					parent = parent.parent;
				}
				path.reverse();
				var ic = instance;
				var ip = path;
				ic.callback(ip);
				return
			}

			if (isTileWalkable(collisionGrid, acceptableTiles, adjacentCoordinateX, adjacentCoordinateY)) {
				var node = coordinateToNode(instance, adjacentCoordinateX, 
					adjacentCoordinateY, searchNode, cost);

				if (node.list === undefined) {
					node.list = EasyStar.Node.OPEN_LIST;
					instance.openList.insert(node);
				} else if (node.list === EasyStar.Node.OPEN_LIST) {
					if (searchNode.costSoFar + cost < node.costSoFar) {
						node.costSoFar = searchNode.costSoFar + cost;
						node.parent = searchNode;
					}
				}
			}
		}
	};

	// Helpers
	var isTileWalkable = function(collisionGrid, acceptableTiles, x, y) {
		for (var i = 0; i < acceptableTiles.length; i++) {
			if (collisionGrid[y][x] === acceptableTiles[i]) {
				return true;
			}
		}

		return false;
	};

	var getTileCost = function(x, y) {
		return pointsToCost[x + '_' + y] || costMap[collisionGrid[y][x]]
	};

	var coordinateToNode = function(instance, x, y, parent, cost) {
		if (instance.nodeHash[x + "_" + y]!==undefined) {
			return instance.nodeHash[x + "_" + y];
		}
		var simpleDistanceToTarget = getDistance(x, y, instance.endX, instance.endY);
		if (parent!==null) {
			var costSoFar = parent.costSoFar + cost;
		} else {
			costSoFar = simpleDistanceToTarget;
		}
		var node = new EasyStar.Node(parent,x,y,costSoFar,simpleDistanceToTarget);
		instance.nodeHash[x + "_" + y] = node;
		return node;
	};

	var getDistance = function(x1,y1,x2,y2) {
		return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
	};
}
},{}],2:[function(require,module,exports){
// WebcamJS v1.0.4
// Webcam library for capturing JPEG/PNG images in JavaScript
// Attempts getUserMedia, falls back to Flash
// Author: Joseph Huckaby: http://github.com/jhuckaby
// Based on JPEGCam: http://code.google.com/p/jpegcam/
// Copyright (c) 2012 - 2015 Joseph Huckaby
// Licensed under the MIT License

(function(window) {

var Webcam = {
	version: '1.0.4',
	
	// globals
	protocol: location.protocol.match(/https/i) ? 'https' : 'http',
	swfURL: '',      // URI to webcam.swf movie (defaults to the js location)
	loaded: false,   // true when webcam movie finishes loading
	live: false,     // true when webcam is initialized and ready to snap
	userMedia: true, // true when getUserMedia is supported natively
	
	params: {
		width: 0,
		height: 0,
		dest_width: 0,        // size of captured image
		dest_height: 0,       // these default to width/height
		image_format: 'jpeg', // image format (may be jpeg or png)
		jpeg_quality: 90,     // jpeg image quality from 0 (worst) to 100 (best)
		force_flash: false,   // force flash mode,
		flip_horiz: false,    // flip image horiz (mirror mode)
		fps: 30,              // camera frames per second
		upload_name: 'webcam', // name of file in upload post data
		constraints: null     // custom user media constraints
	},
	
	hooks: {}, // callback hook functions
	
	init: function() {
		// initialize, check for getUserMedia support
		var self = this;
		
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
		
		this.userMedia = this.userMedia && !!navigator.getUserMedia && !!window.URL;
		
		// Older versions of firefox (< 21) apparently claim support but user media does not actually work
		if (navigator.userAgent.match(/Firefox\D+(\d+)/)) {
			if (parseInt(RegExp.$1, 10) < 21) this.userMedia = null;
		}
		
		// Make sure media stream is closed when navigating away from page
		if (this.userMedia) {
			window.addEventListener( 'beforeunload', function(event) {
				if (self.stream) {
					self.stream.stop();
					self.stream = null;
				}
			} );
		}
	},
	
	attach: function(elem) {
		// create webcam preview and attach to DOM element
		// pass in actual DOM reference, ID, or CSS selector
		if (typeof(elem) == 'string') {
			elem = document.getElementById(elem) || document.querySelector(elem);
		}
		if (!elem) {
			return this.dispatch('error', "Could not locate DOM element to attach to.");
		}
		this.container = elem;
		elem.innerHTML = ''; // start with empty element
		
		// insert "peg" so we can insert our preview canvas adjacent to it later on
		var peg = document.createElement('div');
		elem.appendChild( peg );
		this.peg = peg;
		
		// set width/height if not already set
		if (!this.params.width) this.params.width = elem.offsetWidth;
		if (!this.params.height) this.params.height = elem.offsetHeight;
		
		// set defaults for dest_width / dest_height if not set
		if (!this.params.dest_width) this.params.dest_width = this.params.width;
		if (!this.params.dest_height) this.params.dest_height = this.params.height;
		
		// if force_flash is set, disable userMedia
		if (this.params.force_flash) this.userMedia = null;
		
		// check for default fps
		if (typeof this.params.fps !== "number") this.params.fps = 30;

		// adjust scale if dest_width or dest_height is different
		var scaleX = this.params.width / this.params.dest_width;
		var scaleY = this.params.height / this.params.dest_height;
		
		if (this.userMedia) {
			// setup webcam video container
			var video = document.createElement('video');
			video.setAttribute('autoplay', 'autoplay');
			video.style.width = '' + this.params.dest_width + 'px';
			video.style.height = '' + this.params.dest_height + 'px';
			
			if ((scaleX != 1.0) || (scaleY != 1.0)) {
				elem.style.overflow = 'hidden';
				video.style.webkitTransformOrigin = '0px 0px';
				video.style.mozTransformOrigin = '0px 0px';
				video.style.msTransformOrigin = '0px 0px';
				video.style.oTransformOrigin = '0px 0px';
				video.style.transformOrigin = '0px 0px';
				video.style.webkitTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
				video.style.mozTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
				video.style.msTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
				video.style.oTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
				video.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			}
			
			// add video element to dom
			elem.appendChild( video );
			this.video = video;
			
			// ask user for access to their camera
			var self = this;
			navigator.getUserMedia({
				"audio": false,
				"video": this.params.constraints || {
					mandatory: {
						minWidth: this.params.dest_width,
						minHeight: this.params.dest_height
					}
				}
			}, 
			function(stream) {
				// got access, attach stream to video
				video.src = window.URL.createObjectURL( stream ) || stream;
				Webcam.stream = stream;
				Webcam.loaded = true;
				Webcam.live = true;
				Webcam.dispatch('load');
				Webcam.dispatch('live');
				Webcam.flip();
			},
			function(err) {
				return self.dispatch('error', "Could not access webcam.");
			});
		}
		else {
			// flash fallback
			window.Webcam = Webcam; // needed for flash-to-js interface
			var div = document.createElement('div');
			div.innerHTML = this.getSWFHTML();
			elem.appendChild( div );
		}
		
		// setup final crop for live preview
		if (this.params.crop_width && this.params.crop_height) {
			var scaled_crop_width = Math.floor( this.params.crop_width * scaleX );
			var scaled_crop_height = Math.floor( this.params.crop_height * scaleY );
			
			elem.style.width = '' + scaled_crop_width + 'px';
			elem.style.height = '' + scaled_crop_height + 'px';
			elem.style.overflow = 'hidden';
			
			elem.scrollLeft = Math.floor( (this.params.width / 2) - (scaled_crop_width / 2) );
			elem.scrollTop = Math.floor( (this.params.height / 2) - (scaled_crop_height / 2) );
		}
		else {
			// no crop, set size to desired
			elem.style.width = '' + this.params.width + 'px';
			elem.style.height = '' + this.params.height + 'px';
		}
	},
	
	reset: function() {
		// shutdown camera, reset to potentially attach again
		if (this.preview_active) this.unfreeze();
		
		// attempt to fix issue #64
		this.unflip();
		
		if (this.userMedia) {
			try { this.stream.stop(); } catch (e) {;}
			delete this.stream;
			delete this.video;
		}
		
		if (this.container) {
			this.container.innerHTML = '';
			delete this.container;
		}
	
		this.loaded = false;
		this.live = false;
	},
	
	set: function() {
		// set one or more params
		// variable argument list: 1 param = hash, 2 params = key, value
		if (arguments.length == 1) {
			for (var key in arguments[0]) {
				this.params[key] = arguments[0][key];
			}
		}
		else {
			this.params[ arguments[0] ] = arguments[1];
		}
	},
	
	on: function(name, callback) {
		// set callback hook
		name = name.replace(/^on/i, '').toLowerCase();
		if (!this.hooks[name]) this.hooks[name] = [];
		this.hooks[name].push( callback );
	},
	
	off: function(name, callback) {
		// remove callback hook
		name = name.replace(/^on/i, '').toLowerCase();
		if (this.hooks[name]) {
			if (callback) {
				// remove one selected callback from list
				var idx = this.hooks[name].indexOf(callback);
				if (idx > -1) this.hooks[name].splice(idx, 1);
			}
			else {
				// no callback specified, so clear all
				this.hooks[name] = [];
			}
		}
	},
	
	dispatch: function() {
		// fire hook callback, passing optional value to it
		var name = arguments[0].replace(/^on/i, '').toLowerCase();
		var args = Array.prototype.slice.call(arguments, 1);
		
		if (this.hooks[name] && this.hooks[name].length) {
			for (var idx = 0, len = this.hooks[name].length; idx < len; idx++) {
				var hook = this.hooks[name][idx];
				
				if (typeof(hook) == 'function') {
					// callback is function reference, call directly
					hook.apply(this, args);
				}
				else if ((typeof(hook) == 'object') && (hook.length == 2)) {
					// callback is PHP-style object instance method
					hook[0][hook[1]].apply(hook[0], args);
				}
				else if (window[hook]) {
					// callback is global function name
					window[ hook ].apply(window, args);
				}
			} // loop
			return true;
		}
		else if (name == 'error') {
			// default error handler if no custom one specified
			alert("Webcam.js Error: " + args[0]);
		}
		
		return false; // no hook defined
	},
	
	setSWFLocation: function(url) {
		// set location of SWF movie (defaults to webcam.swf in cwd)
		this.swfURL = url;
	},
	
	detectFlash: function() {
		// return true if browser supports flash, false otherwise
		// Code snippet borrowed from: https://github.com/swfobject/swfobject
		var SHOCKWAVE_FLASH = "Shockwave Flash",
			SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
        	FLASH_MIME_TYPE = "application/x-shockwave-flash",
        	win = window,
        	nav = navigator,
        	hasFlash = false;
        
        if (typeof nav.plugins !== "undefined" && typeof nav.plugins[SHOCKWAVE_FLASH] === "object") {
        	var desc = nav.plugins[SHOCKWAVE_FLASH].description;
        	if (desc && (typeof nav.mimeTypes !== "undefined" && nav.mimeTypes[FLASH_MIME_TYPE] && nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
        		hasFlash = true;
        	}
        }
        else if (typeof win.ActiveXObject !== "undefined") {
        	try {
        		var ax = new ActiveXObject(SHOCKWAVE_FLASH_AX);
        		if (ax) {
        			var ver = ax.GetVariable("$version");
        			if (ver) hasFlash = true;
        		}
        	}
        	catch (e) {;}
        }
        
        return hasFlash;
	},
	
	getSWFHTML: function() {
		// Return HTML for embedding flash based webcam capture movie		
		var html = '';
		
		// make sure we aren't running locally (flash doesn't work)
		if (location.protocol.match(/file/)) {
			this.dispatch('error', "Flash does not work from local disk.  Please run from a web server.");
			return '<h3 style="color:red">ERROR: the Webcam.js Flash fallback does not work from local disk.  Please run it from a web server.</h3>';
		}
		
		// make sure we have flash
		if (!this.detectFlash()) {
			this.dispatch('error', "Adobe Flash Player not found.  Please install from get.adobe.com/flashplayer and try again.");
			return '<h3 style="color:red">ERROR: No Adobe Flash Player detected.  Webcam.js relies on Flash for browsers that do not support getUserMedia (like yours).</h3>';
		}
		
		// set default swfURL if not explicitly set
		if (!this.swfURL) {
			// find our script tag, and use that base URL
			var base_url = '';
			var scpts = document.getElementsByTagName('script');
			for (var idx = 0, len = scpts.length; idx < len; idx++) {
				var src = scpts[idx].getAttribute('src');
				if (src && src.match(/\/webcam(\.min)?\.js/)) {
					base_url = src.replace(/\/webcam(\.min)?\.js.*$/, '');
					idx = len;
				}
			}
			if (base_url) this.swfURL = base_url + '/webcam.swf';
			else this.swfURL = 'webcam.swf';
		}
		
		// if this is the user's first visit, set flashvar so flash privacy settings panel is shown first
		if (window.localStorage && !localStorage.getItem('visited')) {
			this.params.new_user = 1;
			localStorage.setItem('visited', 1);
		}
		
		// construct flashvars string
		var flashvars = '';
		for (var key in this.params) {
			if (flashvars) flashvars += '&';
			flashvars += key + '=' + escape(this.params[key]);
		}
		
		// construct object/embed tag
		html += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" type="application/x-shockwave-flash" codebase="'+this.protocol+'://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="'+this.params.width+'" height="'+this.params.height+'" id="webcam_movie_obj" align="middle"><param name="wmode" value="opaque" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+this.swfURL+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+flashvars+'"/><embed id="webcam_movie_embed" src="'+this.swfURL+'" wmode="opaque" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+this.params.width+'" height="'+this.params.height+'" name="webcam_movie_embed" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'"></embed></object>';
		
		return html;
	},
	
	getMovie: function() {
		// get reference to movie object/embed in DOM
		if (!this.loaded) return this.dispatch('error', "Flash Movie is not loaded yet");
		var movie = document.getElementById('webcam_movie_obj');
		if (!movie || !movie._snap) movie = document.getElementById('webcam_movie_embed');
		if (!movie) this.dispatch('error', "Cannot locate Flash movie in DOM");
		return movie;
	},
	
	freeze: function() {
		// show preview, freeze camera
		var self = this;
		var params = this.params;
		
		// kill preview if already active
		if (this.preview_active) this.unfreeze();
		
		// determine scale factor
		var scaleX = this.params.width / this.params.dest_width;
		var scaleY = this.params.height / this.params.dest_height;
		
		// must unflip container as preview canvas will be pre-flipped
		this.unflip();
		
		// calc final size of image
		var final_width = params.crop_width || params.dest_width;
		var final_height = params.crop_height || params.dest_height;
		
		// create canvas for holding preview
		var preview_canvas = document.createElement('canvas');
		preview_canvas.width = final_width;
		preview_canvas.height = final_height;
		var preview_context = preview_canvas.getContext('2d');
		
		// save for later use
		this.preview_canvas = preview_canvas;
		this.preview_context = preview_context;
		
		// scale for preview size
		if ((scaleX != 1.0) || (scaleY != 1.0)) {
			preview_canvas.style.webkitTransformOrigin = '0px 0px';
			preview_canvas.style.mozTransformOrigin = '0px 0px';
			preview_canvas.style.msTransformOrigin = '0px 0px';
			preview_canvas.style.oTransformOrigin = '0px 0px';
			preview_canvas.style.transformOrigin = '0px 0px';
			preview_canvas.style.webkitTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			preview_canvas.style.mozTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			preview_canvas.style.msTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			preview_canvas.style.oTransform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
			preview_canvas.style.transform = 'scaleX('+scaleX+') scaleY('+scaleY+')';
		}
		
		// take snapshot, but fire our own callback
		this.snap( function() {
			// add preview image to dom, adjust for crop
			preview_canvas.style.position = 'relative';
			preview_canvas.style.left = '' + self.container.scrollLeft + 'px';
			preview_canvas.style.top = '' + self.container.scrollTop + 'px';
			
			self.container.insertBefore( preview_canvas, self.peg );
			self.container.style.overflow = 'hidden';
			
			// set flag for user capture (use preview)
			self.preview_active = true;
			
		}, preview_canvas );
	},
	
	unfreeze: function() {
		// cancel preview and resume live video feed
		if (this.preview_active) {
			// remove preview canvas
			this.container.removeChild( this.preview_canvas );
			delete this.preview_context;
			delete this.preview_canvas;
			
			// unflag
			this.preview_active = false;
			
			// re-flip if we unflipped before
			this.flip();
		}
	},
	
	flip: function() {
		// flip container horiz (mirror mode) if desired
		if (this.params.flip_horiz) {
			var sty = this.container.style;
			sty.webkitTransform = 'scaleX(-1)';
			sty.mozTransform = 'scaleX(-1)';
			sty.msTransform = 'scaleX(-1)';
			sty.oTransform = 'scaleX(-1)';
			sty.transform = 'scaleX(-1)';
			sty.filter = 'FlipH';
			sty.msFilter = 'FlipH';
		}
	},
	
	unflip: function() {
		// unflip container horiz (mirror mode) if desired
		if (this.params.flip_horiz) {
			var sty = this.container.style;
			sty.webkitTransform = 'scaleX(1)';
			sty.mozTransform = 'scaleX(1)';
			sty.msTransform = 'scaleX(1)';
			sty.oTransform = 'scaleX(1)';
			sty.transform = 'scaleX(1)';
			sty.filter = '';
			sty.msFilter = '';
		}
	},
	
	savePreview: function(user_callback, user_canvas) {
		// save preview freeze and fire user callback
		var params = this.params;
		var canvas = this.preview_canvas;
		var context = this.preview_context;
		
		// render to user canvas if desired
		if (user_canvas) {
			var user_context = user_canvas.getContext('2d');
			user_context.drawImage( canvas, 0, 0 );
		}
		
		// fire user callback if desired
		user_callback(
			user_canvas ? null : canvas.toDataURL('image/' + params.image_format, params.jpeg_quality / 100 ),
			canvas,
			context
		);
		
		// remove preview
		this.unfreeze();
	},
	
	snap: function(user_callback, user_canvas) {
		// take snapshot and return image data uri
		var self = this;
		var params = this.params;
		
		if (!this.loaded) return this.dispatch('error', "Webcam is not loaded yet");
		// if (!this.live) return this.dispatch('error', "Webcam is not live yet");
		if (!user_callback) return this.dispatch('error', "Please provide a callback function or canvas to snap()");
		
		// if we have an active preview freeze, use that
		if (this.preview_active) {
			this.savePreview( user_callback, user_canvas );
			return null;
		}
		
		// create offscreen canvas element to hold pixels
		var canvas = document.createElement('canvas');
		canvas.width = this.params.dest_width;
		canvas.height = this.params.dest_height;
		var context = canvas.getContext('2d');
		
		// flip canvas horizontally if desired
		if (this.params.flip_horiz) {
			context.translate( params.dest_width, 0 );
			context.scale( -1, 1 );
		}
		
		// create inline function, called after image load (flash) or immediately (native)
		var func = function() {
			// render image if needed (flash)
			if (this.src && this.width && this.height) {
				context.drawImage(this, 0, 0, params.dest_width, params.dest_height);
			}
			
			// crop if desired
			if (params.crop_width && params.crop_height) {
				var crop_canvas = document.createElement('canvas');
				crop_canvas.width = params.crop_width;
				crop_canvas.height = params.crop_height;
				var crop_context = crop_canvas.getContext('2d');
				
				crop_context.drawImage( canvas, 
					Math.floor( (params.dest_width / 2) - (params.crop_width / 2) ),
					Math.floor( (params.dest_height / 2) - (params.crop_height / 2) ),
					params.crop_width,
					params.crop_height,
					0,
					0,
					params.crop_width,
					params.crop_height
				);
				
				// swap canvases
				context = crop_context;
				canvas = crop_canvas;
			}
			
			// render to user canvas if desired
			if (user_canvas) {
				var user_context = user_canvas.getContext('2d');
				user_context.drawImage( canvas, 0, 0 );
			}
			
			// fire user callback if desired
			user_callback(
				user_canvas ? null : canvas.toDataURL('image/' + params.image_format, params.jpeg_quality / 100 ),
				canvas,
				context
			);
		};
		
		// grab image frame from userMedia or flash movie
		if (this.userMedia) {
			// native implementation
			context.drawImage(this.video, 0, 0, this.params.dest_width, this.params.dest_height);
			
			// fire callback right away
			func();
		}
		else {
			// flash fallback
			var raw_data = this.getMovie()._snap();
			
			// render to image, fire callback when complete
			var img = new Image();
			img.onload = func;
			img.src = 'data:image/'+this.params.image_format+';base64,' + raw_data;
		}
		
		return null;
	},
	
	configure: function(panel) {
		// open flash configuration panel -- specify tab name:
		// "camera", "privacy", "default", "localStorage", "microphone", "settingsManager"
		if (!panel) panel = "camera";
		this.getMovie()._configure(panel);
	},
	
	flashNotify: function(type, msg) {
		// receive notification from flash about event
		switch (type) {
			case 'flashLoadComplete':
				// movie loaded successfully
				this.loaded = true;
				this.dispatch('load');
				break;
			
			case 'cameraLive':
				// camera is live and ready to snap
				this.live = true;
				this.dispatch('live');
				this.flip();
				break;

			case 'error':
				// Flash error
				this.dispatch('error', msg);
				break;

			default:
				// catch-all event, just in case
				// console.log("webcam flash_notify: " + type + ": " + msg);
				break;
		}
	},
	
	b64ToUint6: function(nChr) {
		// convert base64 encoded character to 6-bit integer
		// from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
		return nChr > 64 && nChr < 91 ? nChr - 65
			: nChr > 96 && nChr < 123 ? nChr - 71
			: nChr > 47 && nChr < 58 ? nChr + 4
			: nChr === 43 ? 62 : nChr === 47 ? 63 : 0;
	},

	base64DecToArr: function(sBase64, nBlocksSize) {
		// convert base64 encoded string to Uintarray
		// from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding
		var sB64Enc = sBase64.replace(/[^A-Za-z0-9\+\/]/g, ""), nInLen = sB64Enc.length,
			nOutLen = nBlocksSize ? Math.ceil((nInLen * 3 + 1 >> 2) / nBlocksSize) * nBlocksSize : nInLen * 3 + 1 >> 2, 
			taBytes = new Uint8Array(nOutLen);
		
		for (var nMod3, nMod4, nUint24 = 0, nOutIdx = 0, nInIdx = 0; nInIdx < nInLen; nInIdx++) {
			nMod4 = nInIdx & 3;
			nUint24 |= this.b64ToUint6(sB64Enc.charCodeAt(nInIdx)) << 18 - 6 * nMod4;
			if (nMod4 === 3 || nInLen - nInIdx === 1) {
				for (nMod3 = 0; nMod3 < 3 && nOutIdx < nOutLen; nMod3++, nOutIdx++) {
					taBytes[nOutIdx] = nUint24 >>> (16 >>> nMod3 & 24) & 255;
				}
				nUint24 = 0;
			}
		}
		return taBytes;
	},
	
	upload: function(image_data_uri, target_url, callback) {
		// submit image data to server using binary AJAX
		var form_elem_name = this.params.upload_name || 'webcam';
		
		// detect image format from within image_data_uri
		var image_fmt = '';
		if (image_data_uri.match(/^data\:image\/(\w+)/))
			image_fmt = RegExp.$1;
		else
			throw "Cannot locate image format in Data URI";
		
		// extract raw base64 data from Data URI
		var raw_image_data = image_data_uri.replace(/^data\:image\/\w+\;base64\,/, '');
		
		// contruct use AJAX object
		var http = new XMLHttpRequest();
		http.open("POST", target_url, true);
		
		// setup progress events
		if (http.upload && http.upload.addEventListener) {
			http.upload.addEventListener( 'progress', function(e) {
				if (e.lengthComputable) {
					var progress = e.loaded / e.total;
					Webcam.dispatch('uploadProgress', progress, e);
				}
			}, false );
		}
		
		// completion handler
		var self = this;
		http.onload = function() {
			if (callback) callback.apply( self, [http.status, http.responseText, http.statusText] );
			Webcam.dispatch('uploadComplete', http.status, http.responseText, http.statusText);
		};
		
		// create a blob and decode our base64 to binary
		var blob = new Blob( [ this.base64DecToArr(raw_image_data) ], {type: 'image/'+image_fmt} );
		
		// stuff into a form, so servers can easily receive it as a standard file upload
		var form = new FormData();
		form.append( form_elem_name, blob, form_elem_name+"."+image_fmt.replace(/e/, '') );
		
		// send data to server
		http.send(form);
	}
	
};

Webcam.init();

if (typeof define === 'function' && define.amd) {
	define( function() { return Webcam; } );
} 
else if (typeof module === 'object' && module.exports) {
	module.exports = Webcam;
} 
else {
	window.Webcam = Webcam;
}

}(window));

},{}],3:[function(require,module,exports){
"use strict";

module.exports = "data:image/gif;base64,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";

},{}],4:[function(require,module,exports){
'use strict';

console.log('Oh HAI!');

var Easystar = require('easystarjs').js;
var fakeImageData = require('./fakeImageData');
// Webcam stuff
var Webcam = require('webcamjs');

Webcam.set({
  width: 530,
  height: 400,
  dest_width: 530,
  dest_height: 400,
  crop_width: 530,
  crop_height: 400,
  image_format: 'png'
});

Webcam.attach('#maze-input');
function take_snapshot() {
  Webcam.snap(drawImage);
}

// File upload stuff
function read_localfile() {
  var preview = document.querySelector('#preview');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    drawImage(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    drawImage("");
  }
}

//Use fake stuff
function use_fake_data() {
  drawImage(fakeImageData);
}

// display base64 stuff on canvas
var canvasSel = 'maze-canvas';
function drawImage(imgData) {
  localStorage.imgData = imgData;
  var canvas = document.getElementById(canvasSel);
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.onload = function () {
    var width = img.naturalWidth;
    var height = img.naturalHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
  };
  img.src = imgData;
}

// handle click events for inputs
document.getElementById('take-photo').addEventListener('click', take_snapshot);
document.getElementById('upload-file').addEventListener('change', read_localfile);
document.getElementById('fake-data').addEventListener('click', use_fake_data);

if (localStorage.imgData) {
  drawImage(localStorage.imgData);
}

// this should happen after img drawn!
var canvas = document.getElementById(canvasSel);
var points = {};
canvas.addEventListener('mousedown', function (e) {
  var x = e.pageX - canvas.offsetLeft;
  var y = e.pageY - canvas.offsetTop;
  var ctx = canvas.getContext('2d');

  var drawPoint = function drawPoint(_ref) {
    var x = _ref.x;
    var y = _ref.y;
    var color = arguments.length <= 1 || arguments[1] === undefined ? "red" : arguments[1];

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 5, 5);
  };

  if (!points.start) {
    points.start = { x: x, y: y };
    drawPoint({ x: x, y: y });
    // making assumption start is on top
    // cutOff('above', points.start.y - 1, ctx);
  } else if (!points.finish) {
      points.finish = { x: x, y: y };
      // drawPoint({x,y}, "green");
      // making assumption end is on bottom
      // cutOff('below', points.finish.y + 5, ctx);
    }

  if (points.start && points.finish) {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    drawPoint(points.start, "white");
    solve(points, imageData);
  }
});

function drawData(data) {
  var ctx = canvas.getContext('2d');
  ctx.putImageData(data, 0, 0);
}
function cutOff(direction, pointY, ctx) {
  ctx.fillStyle = 'black';
  var startY = direction == 'above' ? 0 : pointY;
  var endY = direction == 'above' ? pointY : canvas.height;
  ctx.fillRect(0, startY, canvas.width, endY);
}
var threshold = 100;
document.getElementById('threshold').value = threshold;
document.getElementById('threshold').addEventListener('change', function (e) {
  threshold = this.value;
});
function isWalkable(_ref2) {
  var r = _ref2.r;
  var g = _ref2.g;
  var b = _ref2.b;
  var a = _ref2.a;

  return [r, g, b].every(function (val) {
    return val < threshold;
  });
}
function solve(_ref3, frame) {
  var start = _ref3.start;
  var finish = _ref3.finish;

  var o = {};
  var resultMatrix = [];
  for (var i = 0, l = frame.data.length / 4; i < l; i++) {
    o.r = frame.data[i * 4 + 0];
    o.g = frame.data[i * 4 + 1];
    o.b = frame.data[i * 4 + 2];
    o.a = frame.data[i * 4 + 3];

    var result = isWalkable(o);
    var row = Math.floor(i / frame.width);
    var column = i % frame.width;
    if (!resultMatrix[row]) {
      resultMatrix[row] = [];
    }
    resultMatrix[row][column] = ~ ~result;
    frame.data[i * 4 + 0] = result ? 0 : 255;
    frame.data[i * 4 + 1] = result ? 0 : 255;
    frame.data[i * 4 + 2] = result ? 0 : 255;
    frame.data[i * 4 + 3] = 255;
  }
  drawData(frame);
  var solver = new Easystar();
  solver.setGrid(resultMatrix);
  solver.setAcceptableTiles([0]);
  console.time('solving');
  solver.findPath(points.start.x, points.start.y, points.finish.x, points.finish.y, function (path) {
    console.timeEnd('solving');
    if (path === null) {
      alert("Path was not found.");
    } else {
      displayResult(path);
    }
  });
  solver.calculate();
}

function displayResult(path) {
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pixel = _step.value;

      ctx.fillRect(pixel.x, pixel.y, 1, 1);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
// display result

},{"./fakeImageData":3,"easystarjs":1,"webcamjs":2}]},{},[4]);
