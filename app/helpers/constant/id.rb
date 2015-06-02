module Constant::Id
	if Rails.env.development?
		Admin						= [3952772, 4084079]
		BestTinyRead				= 1250445 #"thelosthero"
		BestSmallRead				= 390687 #"thelittleprince"
		BestNormalRead				= 1171519 #"harrypotterandthephilosophersstone"
		BestLongRead				= 395152 #"thehungergames"
		BestBook					= 395152 #"thehungergames"
		BestGrid					= 2594148
	else
		Admin						= [4084079, 4105710]
		BestTinyRead				= 1250445 #"thelosthero"
		BestSmallRead				= 390687 #"thelittleprince"
		BestNormalRead				= 1171519 #"harrypotterandthephilosophersstone"
		BestLongRead				= 395152 #"thehungergames"
		BestBook					= 395152 #"thehungergames"
		BestGrid					= 2594148
	end	

	TinyReadNode	 			= 772852
	SmallReadNode	 			= 772853
	NormalReadNode	 			= 772854
	LongReadNode	 			= 772855

	OldEnglishLiterature		= 422360
	MiddleEnglishLiterature		= 422363
	EnglishRenaissance 			= 422367
	NeoClassicalPeriod 			= 422368
	Romanticism 				= 422371
	VictorianLiterature 		= 422372
	Modernism 					= 422373
	PostModernLiterature 		= 422374
	Contemporary				= 422375
end