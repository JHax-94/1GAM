using UnityEngine;
using System.Collections;

public class DropModeControl : MonoBehaviour {

	public CampaignGUI campaignHide;

	public void StartDrop()
	{
		campaignHide.enabled = false;
		Application.LoadLevelAdditive("DropMode");
	}

}
