<?hh

namespace AppBundle\Services;

use Doctrine\ORM\EntityRepository;
use AppBundle\Entity\Post;

/**
 * @package    hhvm
 * @category   hhvm
 * * @author     Cteam
 * @copyright  (c) 2015 Cteam | Ponteiro Team
 */
class BlogService
{

    /**
     * @param EntityRepository $repo
     */
    public function __construct(EntityRepository $repo) : void
    {
        $this->repo = $repo;
    }

/**
 *
 */
    public function findAll() : array
    {
        return $this->repo->findAll();
    }

    public function findById(int $id) : ?Post
    {

    }

}