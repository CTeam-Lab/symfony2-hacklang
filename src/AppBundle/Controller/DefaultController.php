<?hh
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Response;

/**
 * Class DefaultController
 * @package AppBundle\Controller
 */
class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(): Response
    {

        $blogRepo = $this->get('doctrine.orm.entity_manager')->getRepository('AppBundle\Entity\Post');
        $posts = $blogRepo->findAll();

        return $this->render('default/index.html.twig', [
            'posts' => $posts
        ]);
    }

    /**
    * @Route("/contact", name="contact")
    */
    public function contactAction(): Response
    {
        return $this->render('contact.html.twig');
    }

    /**
     * @Route("/about", name="about")
     */
    public function aboutAction(): Response
    {
        return $this->render('about.html.twig');
    }

    /**
     * @Route("/post", name="post")
     */
    public function postAction(): Response
    {
        return $this->render('post.html.twig');
    }

    /**
     * @Route("/rss/", name="rss")
     */
    public function rssAction(): Response
    {
        return new Response();
    }

}
