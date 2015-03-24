<?php
namespace Application\Frontend\ClientBundle\Controller;

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
    public function indexAction()
    {
        $blogRepo = $this->get('doctrine.orm.entity_manager')->getRepository('ApplicationFrontendClientBundle:Post');
        $posts = $blogRepo->findBy([], ['dateCreated' => 'DESC']);

        return $this->render('default/index.html.twig', [
            'posts' => $posts
        ]);
    }

    /**
    * @Route("/contact", name="contact")
    */
    public function contactAction()
    {
        return $this->render('contact.html.twig');
    }

    /**
     * @Route("/about", name="about")
     */
    public function aboutAction()
    {
        return $this->render('about.html.twig');
    }

    /**
     * @Route("/post/{slug}", name="post")
     */
    public function postAction($slug)
    {
        $blogRepo = $this->get('doctrine.orm.entity_manager')->getRepository('ApplicationFrontendClientBundle:Post');
        $post = $blogRepo->findOneBySlug($slug);

        if (!$post) {
            throw new \InvalidArgumentException("Blog Post $slug not found.");
        }

        return $this->render('post.html.twig', [
            'post' => $post
        ]);
    }

    /**
     * @Route("/author/{username}", name="author")
     */
    public function authorAction($username)
    {
        $userRepo = $this->get('doctrine.orm.entity_manager')->getRepository('ApplicationFrontendClientBundle:User');
        $user = $userRepo->findOneByUsername($username);

        if (!$user) {
            throw new \InvalidArgumentException("Author $username not found.");
        }

        return $this->render('author.html.twig', [
           'author' => $user
        ]);
    }

    /**
     * @Route("/category/{slug}", name="category")
     */
    public function categoryAction($slug)
    {
        $categoryRepo = $this->get('doctrine.orm.entity_manager')->getRepository('ApplicationFrontendClientBundle:Category');
        $cat = $categoryRepo->findOneBySlug($slug);

        if (!$cat) {
            throw new \InvalidArgumentException("Category $slug not found.");
        }

        return $this->render('category.html.twig', [
            'category' => $cat
        ]);
    }

    /**
     * @Route("/rss/", name="rss")
     */
    public function rssAction()
    {
        return new Response();
    }

}
