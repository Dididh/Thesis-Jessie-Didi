db.entities.aggregate(

	// Pipeline
	[
		// Stage 1
		{
			$match: {
			    "documentType": "aggregated-ner"
			}
		},

		// Stage 2
		{
			$unwind: {
			    path : "$content.entities",
			}
		},

		// Stage 3
		{
			$unwind: {
			    path: "$content.entities.provenance"
			}
		},

		// Stage 4
		{
			$unwind: {
			    path : "$content.entities.types"
			}
		},

		// Stage 5
		{
			$match: {
			    "content.entities.types.typeProvenance" : "yago"
			}
		},

		// Stage 6
		{
			$group: {
			    _id: "$content.entities.types.type",
			    count: {$sum : 1}
			}
		},

		// Stage 7
		{
			$sort: {
				count : -1
			}
		},

		// Stage 8
		{
			$count: "count"
		},
	],

	// Options
	{
		cursor: {
			batchSize: 50
		}
	}

	// Created with Studio 3T, the IDE for MongoDB - https://studio3t.com/

);
