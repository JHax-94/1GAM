using UnityEngine;
using System.Collections;

public class cameraDrop : MonoBehaviour {

	public dropIntro Mother;

	public Transform follow;
	public Rigidbody2D pacer;
	public float Min_y;
	public float Max_y;

	Transform _transform;
	Rigidbody2D _mechanics;

	//Transform cam_transform;

	//bool Freeze = false;

	// Use this for initialization


	void Start () 
	{
		_transform = transform;
		_mechanics = GetComponent<Rigidbody2D>();
		_transform.position = new Vector3(0f, follow.position.y-1f, -10f);

		Max_y = Mother.MaxHeight();
	}
	
	// Update is called once per frame
	void Update () 
	{

		if(follow.position.y > Min_y && follow.position.y < Max_y)
		{

			_mechanics.velocity = new Vector2(0, pacer.velocity.y);
			//transform.position = new Vector3(0f,  follow.position.y, -10f);
			//transform.position = Vector3.Lerp (transform.position, follow.position, Time.deltaTime);

		}
		else if(follow.position.y <= Min_y)
		{
			_mechanics.velocity = Vector2.zero;
			_transform.position = new Vector3(0f,  Min_y, -10f);
		}
		else
		{
			_mechanics.velocity = Vector2.zero;
			_transform.position = new Vector3(0f, Max_y, -10f);
		}
	}
}
