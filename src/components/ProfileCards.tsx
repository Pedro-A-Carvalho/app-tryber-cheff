import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProfileCards() {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>My done recipes</Card.Title>
          <Card.Text>
            List of recipes that you have already tested.
          </Card.Text>
          <Button
            variant="primary"
            href="/done-recipes"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>My favorite recipes</Card.Title>
          <Card.Text>
            Recipes that you love the most.
          </Card.Text>
          <Button
            variant="primary"
            href="/favorite-recipes"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </Button>
        </Card.Body>
      </Card>

    </div>
  );
}

export default ProfileCards;
