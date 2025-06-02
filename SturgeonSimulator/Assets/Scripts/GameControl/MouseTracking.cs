using UnityEngine;
using System.Collections;

public class MouseTracking : MonoBehaviour {

	public GUITexture trackerBall;

	Vector2 Position;
	Vector2 Size;


	public Vector3 trackingPosition()
	{
		return Camera.main.ScreenToWorldPoint(new Vector3(trackerBall.pixelInset.x, trackerBall.pixelInset.y-Size.y/2, 0));

	}

	// Use this for initialization
	void Start () 
	{
		Position = new Vector2(trackerBall.pixelInset.x, trackerBall.pixelInset.y);
		Size = new Vector2(trackerBall.pixelInset.width, trackerBall.pixelInset.height);

		Cursor.visible = false;

	}

	// Update is called once per frame
	void Update () 
	{
		trackerBall.pixelInset = new Rect(Position.x, Input.mousePosition.y-Size.y, Size.x, Size.y);



	}
}
