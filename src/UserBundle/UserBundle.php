<?php

namespace UserBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

/**
 * @author <yourname> <youremail>
 */
class UserBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return 'SonataUserBundle';
    }
}