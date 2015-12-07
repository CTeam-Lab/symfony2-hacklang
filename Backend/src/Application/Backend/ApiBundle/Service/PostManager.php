<?php
namespace Application\Backend\ApiBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Application\Frontend\ClientBundle\Entity\Repository\PostRepository;

/**
 * @package    hhvm
 * @category   hhvm
 * @author     Jorge Meireles
 * @copyright  (c) 2015 Jovago
 */
class PostManager
{
    /**
     * @var EntityManagerInterface
     */
    protected $em;

    /**
     * @var PostRepository
     */
    protected $repository;

    /**
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repository = $em->getRepository('ApplicationFrontendClientBundle:Post');
    }

    /**
     * Get a Page.
     *
     * @param mixed $id
     *
     * @return mixed
     */
    public function get($id)
    {
        return $this->repository->find($id);
    }

    /**
     * Get a list of Pages.
     *
     * @param int $limit  the limit of the result
     * @param int $offset starting from the offset
     *
     * @return array
     */
    public function all($limit = 5, $offset = 0)
    {
        return $this->repository->findBy(array(), null, $limit, $offset);
    }

}