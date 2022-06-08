#pragma strict

var highScores = new float[12];
var scoreKeys = new String[12];	

function setKeys()
{
	for(var i : int = 0; i < 12; i ++)
	{
		scoreKeys[i] = "level" + i + "Score";
	}
}

function SaveScores()
{
	for(var i : int = 0; i < 12; i ++)
	{
		//Debug.Log("Saving " + scoreKeys[i]);
		//Debug.Log("Value: " + highScores[i]);
		PlayerPrefs.SetFloat(scoreKeys[i], highScores[i]);
	}
	
	PlayerPrefs.Save();
}

function SaveScore(lvl: int)
{
	Debug.Log("Saving " + scoreKeys[lvl]);
	Debug.Log("Value: " + highScores[lvl]);
	PlayerPrefs.SetFloat(scoreKeys[lvl], highScores[lvl]);
	
	PlayerPrefs.Save();
}

function Start()
{
	if(Application.loadedLevel == 0)
	{	
		
		setKeys();
		
		if(PlayerPrefs.HasKey("level0Score") == false)
		{
			for(var i : int = 0; i < 12; i ++)
			{
				highScores[i] = 0;
			}
		}
		else
		{
			getHighScores();
		}
		
		SaveScores();
	}
}

function getHighScores()
{
	for(var i : int = 0; i < 12; i ++)
	{
		highScores[i] = PlayerPrefs.GetFloat(scoreKeys[i]);
	}	
}

function getHighScore(lvl : int)
{
	return highScores[lvl];
}

function setHighScore(lvl : int, score : float)
{	
	setKeys();
	getHighScores();
	
	highScores[lvl] = score;
	SaveScore(lvl);
}
